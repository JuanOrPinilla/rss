package com.example.backend;

import com.example.backend.model.Article;
import com.example.backend.service.RssService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    private final RssService rssService;
    private final ObjectMapper objectMapper;

    public BackendApplication(RssService rssService, ObjectMapper objectMapper) {
        this.rssService = rssService;
        this.objectMapper = objectMapper;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<Article> articles = rssService.fetchArticles();

        Path outputPath = Paths.get(System.getProperty("user.dir"), "../frontend/public/rss.json").normalize();
        File outputFile = outputPath.toFile();

        outputFile.getParentFile().mkdirs();

        objectMapper.writerWithDefaultPrettyPrinter().writeValue(outputFile, articles);

        System.out.println("✅ Archivo rss.json generado en: " + outputPath.toAbsolutePath());
    }
}
