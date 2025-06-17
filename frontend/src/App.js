import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/carousel/CarouselTop.js';
import List from './components/list/list.js';
import './assets/fonts/fonts.css';

function App() {
  const titleText = "Conecta con la web";

  return (
    <>
      <header className="header">
        {/* Barra superior */}
        <div className="logo">
          RSS 
        </div>
        <div className="reader">
          Reader
        </div>
      </header>
      <main>
        <h1 className="title">
          {titleText.split("").map((char, index) => (
            <span
              key={index}
              className="fade-letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <h2 className="subtitle fade-subtitle">
          Contenido de múltiples fuentes en un solo lugar, actualizado cada 24 horas. Lee titulares, explora resúmenes y amplía solo lo que te interesa
        </h2>
        <div className="scroll-banner">
          <p className="scroll-text">TUS 5 NOTICIAS AL INSTANTE</p>
        </div>

        <div className="carousel-container">
          <Carousel/>
        </div>
        <div
          className="banner"
          role="button"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <p className="text-list">OTRAS NOTICIAS</p>
        </div>

        <div>
          <List/>
        </div>
          
      </main>
    </>
  );
}

export default App;
