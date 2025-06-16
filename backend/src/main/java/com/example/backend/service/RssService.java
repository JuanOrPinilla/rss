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

@Service
public class RssService {

     private final RssProperties rssProperties;

    public RssService(RssProperties rssProperties) {
        this.rssProperties = rssProperties;
    }

    public List<Article> fetchArticles() {
        List<Article> articles = new ArrayList<>();
        for (String sourceUrl : rssProperties.getSources()) {
            try{
                URL url = new URL(sourceUrl);
                SyndFeedInput input = new SyndFeedInput();
                SyndFeed feed = input.build(new XmlReader(url));

                for(SyndEntry entry : feed.getEntries()) {
                    Article article = new Article();
                    article.setTitle(entry.getTitle());
                    
                    String rawDescription = entry.getDescription() != null ? entry.getDescription().getValue() : "";
                    String cleanDescription = Jsoup.parse(rawDescription).text();
                    article.setDescription(cleanDescription);

                    article.setCategory(entry.getCategories().isEmpty() ? "" : entry.getCategories().get(0).getName());
                    article.setLink(entry.getLink());
                    
                    if (entry.getPublishedDate() != null) {
                        ZonedDateTime publishedAt = ZonedDateTime.ofInstant(
                            entry.getPublishedDate().toInstant(),
                            ZoneId.systemDefault()
                        );
                        article.setPublishedAt(publishedAt);
                    } else {
                        article.setPublishedAt(ZonedDateTime.now());
                    }

                    articles.add(article);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    
    articles.sort(Comparator.comparing(Article::getPublishedAt).reversed());
    
    return articles;
    }
}
