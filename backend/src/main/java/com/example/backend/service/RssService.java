package com.example.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.config.RssProperties;
import com.example.backend.model.Article;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.jsoup.Jsoup;

import java.net.URL;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * Servicio que se encarga de obtener artículos desde múltiples fuentes RSS.
 * Utiliza la librería Rome para leer las fuentes y Jsoup para limpiar el contenido HTML.
 * Retorna una lista de artículos ordenada por fecha de publicación descendente.
 */
@Service
public class RssService {

    // Inyecta la configuración con las URLs de las fuentes RSS
    private final RssProperties rssProperties;

    public RssService(RssProperties rssProperties) {
        this.rssProperties = rssProperties;
    }

    public List<Article> fetchArticles() {
        List<Article> articles = new ArrayList<>();

        // Itera sobre cada URL de fuente RSS configurada
        for (String sourceUrl : rssProperties.getSources()) {
            try{
                URL url = new URL(sourceUrl);

                // Utiliza Rome para leer y parsear la fuente
                SyndFeedInput input = new SyndFeedInput();
                SyndFeed feed = input.build(new XmlReader(url));

                // Itera sobre cada entrada de la fuente 
                for(SyndEntry entry : feed.getEntries()) {
                    Article article = new Article();

                    // Asigna el título del artículo
                    article.setTitle(entry.getTitle());

                    
                    
                    // Limpia la descripción de etiquetas HTML usando Jsoup
                    String rawDescription = entry.getDescription() != null ? entry.getDescription().getValue() : "";
                    String cleanDescription = Jsoup.parse(rawDescription).text();
                    article.setDescription(cleanDescription);

                    // Crear resumen: primeras 200 caracteres
                    String summary = cleanDescription.length() > 200
                        ? cleanDescription.substring(0, 200) + "..."
                        : cleanDescription;
                    article.setSummary(summary);

                    // Extraer primera imagen (si existe) del contenido HTML
                    String imageUrl = Jsoup.parse(rawDescription)
                        .select("img")
                        .stream()
                        .findFirst()
                        .map(img -> img.attr("abs:src"))
                        .orElse(null);

                    article.setImageUrl(imageUrl);

                    // Extrae todas las categorías del artículo como una lista de strings
                    var categories = entry.getCategories().stream()
                        .map(c -> c.getName())
                        .filter(name -> name != null && !name.isBlank())
                        .toList();

                    article.setCategories(categories.isEmpty() ? null : categories);
                    
                    // Asigna el enlace original del artículo
                    article.setLink(entry.getLink());
                    
                    // Asigna la fecha de publicación si existe, de lo contrario usa la fecha actual
                    if (entry.getPublishedDate() != null) {
                        ZonedDateTime publishedAt = ZonedDateTime.ofInstant(
                            entry.getPublishedDate().toInstant(),
                            ZoneId.systemDefault()
                        );
                        article.setPublishedAt(publishedAt);
                    } else {
                        article.setPublishedAt(ZonedDateTime.now());
                    }

                    // Agrega el artículo procesado a la lista
                    articles.add(article);
                }
            } catch (Exception e) {
                System.err.println("Error procesando feed desde: " + sourceUrl);
                System.err.println("Motivo: " + e.getMessage());
            }
        }
    
    // Ordena los artículos por fecha de publicación de forma descendente
    articles.sort(Comparator.comparing(Article::getPublishedAt).reversed());
    
    return articles;
    }
}
