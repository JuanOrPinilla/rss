package com.example.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Clase de configuración que mapea las propiedades definidas en el archivo  de application.yml
 * Permite acceder fácilmente a la lista de URLs de fuentes RSS.
 */

@Configuration
@ConfigurationProperties(prefix = "rss")
public class RssProperties {
    private List<String> sources;

    public List<String> getSources() {
        return sources;
    }

    public void setSources(List<String> sources) {
        this.sources = sources;
    }

}
