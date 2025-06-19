import React, { useEffect, useState } from 'react';
import Article from'../article/Article.js';
import './List.css';

function List() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('rss.json', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          publishedAt={article.publishedAt}
          description={article.description}
          link={article.link}
          imageUrl={article.imageUrl}
          categories={article.categories}
          summary={article.summary}
        />
      ))}
    </div>
  );
}

export default List;
