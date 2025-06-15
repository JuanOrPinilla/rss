package com.example.backend.controller;

import com.example.backend.model.Article;
import com.example.backend.service.RssService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class RssController {

    private final RssService rssService;

    public RssController(RssService rssService) {
        this.rssService = rssService;
    }

    @GetMapping
    public List<Article> getArticles() {
        return rssService.fetchArticles();
    }

}
