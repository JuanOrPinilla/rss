import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './CarouselTop.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CarouselTop() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 5)))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <h4 className="carousel-title">Las más recientes</h4>
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="carousel-slide">
  <div className="slide-content flip-card">
    <div className="flip-inner">
      {/* Front side */}
          <div className="flip-front">
            <h3 className="slide-title">{article.title}</h3>
            <p className="slide-date">{formatDate(article.publishedAt)}</p>
          </div>

          {/* Back side */}
          <div className="flip-back">
            <p className="slide-summary">{article.summary}</p>
          </div>
        </div>
      </div>
    </div>
        ))}
      </Slider>
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES') + ' - ' + date.toLocaleTimeString('es-ES');
}

export default CarouselTop;
