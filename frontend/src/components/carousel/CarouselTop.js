import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './CarouselTop.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow({ onClick }) {
  return (
    <div className="arrow next" onClick={onClick}>
      &gt;
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div className="arrow prev" onClick={onClick}>
      &lt;
    </div>
  );
}

function CarouselTop() {
  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/rss.json')
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 5)))
      .catch(err => console.error('Error fetching articles:', err));
  }, [])
  const settings = {
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  speed: 500,
  infinite: true,
  dots: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  afterChange: index => setCurrentSlide(index),
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
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="carousel-slide">
  <div className="slide-content flip-card">
    <div className="flip-inner">
          <div className="flip-front">
            <h3 className="slide-title">{article.title}</h3>
            <p className="slide-date">{formatDate(article.publishedAt)}</p>
          </div>

          <div className="flip-back">
            <p className="slide-summary">{article.summary}</p>
          </div>
        </div>
      </div>
    </div>
        ))}
      </Slider>

      <div className="carousel-dots">
      {articles.map((_, idx) => (
        <span
          key={idx}
          className={`dot ${idx === (currentSlide % articles.length) ? 'active' : ''}`}
        ></span>
      ))}
    </div>
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-EN') + ' - ' + date.toLocaleTimeString('en-EN');
}

export default CarouselTop;
