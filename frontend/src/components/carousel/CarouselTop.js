import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselTop.css';

function CarouselTop() {
  return (
    <Carousel interval={4000} pause="hover" controls={false}>
      <Carousel.Item>
        <div className="text-slide">
          <h3>Explora contenido personalizado</h3>
          <p>Descubre temas que se adaptan a tus intereses.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-slide">
          <h3>Conecta con la web</h3>
          <p>Accede a las últimas noticias y tendencias desde un solo lugar.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-slide">
          <h3>Simplifica tu lectura</h3>
          <p>Organiza y lee tus fuentes favoritas con facilidad.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselTop;
