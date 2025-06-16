package com.example.backend.service;

import com.example.backend.config.RssProperties;
import com.example.backend.model.Article;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class RssServiceTest {

     /**
     * Verifica que al consultar una fuente válida se obtenga una lista de artículos no vacía,
     * y que cada artículo tenga sus campos esenciales no nulos.
     */
    @Test
    public void FetchArticlesReturnsResults() {
        RssProperties props = new RssProperties();
        props.setSources(Collections.singletonList("https://dev.to/feed/tag/javascript"));

        RssService rssService = new RssService(props);
        List<Article> articles = rssService.fetchArticles();

        assertNotNull(articles, "La lista de artículos no debería ser null");
        assertFalse(articles.isEmpty(), "La lista de artículos no debería estar vacía");

        Article first = articles.get(0);
        assertNotNull(first.getTitle(), "El título no debería ser null");
        assertNotNull(first.getLink(), "El enlace no debería ser null");
        assertNotNull(first.getPublishedAt(), "La fecha no debería ser null");
    }

    /**
     * Verifica que una URL que no es un RSS válido no cause errores
     * y devuelva  una lista vacía.
     */
    @Test
    public void InvalidUrl() {
        RssProperties props = new RssProperties();
        props.setSources(Collections.singletonList("https://www.youtube.com"));

        RssService rssService = new RssService(props);
        List<Article> articles = rssService.fetchArticles();

        assertNotNull(articles);
        assertTrue(articles.isEmpty(), "Una URL inválida debe retornar lista vacía");
    }

     /**
     * Verifica que si se mezclan fuentes válidas e inválidas,
     * al menos se obtienen artículos de las fuentes válidas.
     */
    @Test
    public void MixedValidAndInvalidSources() {
        RssProperties props = new RssProperties();
        props.setSources(List.of(
            "https://dev.to/feed/tag/javascript",
            "https://www.youtube.com",
            "https://hnrss.org/newest" 
        ));

        RssService rssService = new RssService(props);
        List<Article> articles = rssService.fetchArticles();

        assertNotNull(articles);
        assertFalse(articles.isEmpty(), "Debería haber artículos de fuentes válidas");
        }
    
    /**
     * Verifica que los artículos estén ordenados de forma descendente por fecha de publicación.
     */
    @Test
    public void ArticlesAreSortedByDateDescending() {
        RssProperties props = new RssProperties();
        props.setSources(List.of("https://dev.to/feed/tag/javascript"));

        RssService rssService = new RssService(props);
        List<Article> articles = rssService.fetchArticles();

        assertTrue(articles.size() > 1);

        for (int i = 0; i < articles.size() - 1; i++) {
            assertTrue(articles.get(i).getPublishedAt()
                    .isAfter(articles.get(i + 1).getPublishedAt()) ||
                    articles.get(i).getPublishedAt()
                    .isEqual(articles.get(i + 1).getPublishedAt()),
                    "Los artículos deben estar en orden descendente por fecha");
        }
    }

}