package com.example.backend.model;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Modelo que representa un artículo extraído desde una fuente RSS.
 *
 * Esta clase contiene los campos para almacenar la información
 * de una entrada RSS, incluyendo: título, descripción, categorías,
 * enlace al contenido original y la fecha de publicación.
 */
public class Article {
    private String title;
    private String summary;
    private String description;
    private List<String> categories; 
    private String link;
    private ZonedDateTime publishedAt;
    private String imageUrl;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public ZonedDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(ZonedDateTime publishedAt) { this.publishedAt = publishedAt; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
