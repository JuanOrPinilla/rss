import React, { useState } from 'react';
import './Article.css';
import ArticleModal from './ArticleModal';

function Article(props) {
  const [showModal, setShowModal] = useState(false);
  const [hasBeenVisited, setHasBeenVisited] = useState(false);

  const { title, publishedAt, summary } = props;

  const handleOpen = () => {
    setShowModal(true);
    setHasBeenVisited(true);
  };

  return (
    <>
      <div
        role="article"
        className={`article-card ${hasBeenVisited ? 'visited' : ''}`}
        onClick={handleOpen}
      >
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{formatDate(publishedAt)}</p>
        <p className="article-summary">
          {summary && summary.trim() !== '' ? summary : 'No hay descripción asociada'}
        </p>
      </div>

      {showModal && (
        <ArticleModal
          article={props}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES') + ' - ' + date.toLocaleTimeString('es-ES');
}

export default Article;
