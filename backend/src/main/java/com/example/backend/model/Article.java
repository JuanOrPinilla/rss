package com.example.backend.model;
import java.time.ZonedDateTime;

/**
 * Modelo que representa un artículo extraído desde un source RSS.
 * 
 * Esta clase contiene los campos para almacenar la información
 * de una entrada RSS, siendo estos: título, descripción, categoría,
 * enlace al contenido original y la fecha de publicación.
 * 
 */

public class Article {
    private String title;
    private String description;
    private String category;
    private String link;
    private ZonedDateTime publishedAt;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title;}

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description;}

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category;}

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public ZonedDateTime getPublishedAt() { return publishedAt;}
    public void setPublishedAt(ZonedDateTime publishedAt) {this.publishedAt = publishedAt;}

}
