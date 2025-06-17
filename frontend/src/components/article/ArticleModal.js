// components/article/ArticleModal.js
import React from 'react';
import './ArticleModal.css';

function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>

        <p className="modal-date">{formatDate(article.publishedAt)}</p>

        {article.categories?.length > 0 && (
          <ul className="modal-categories">
            {article.categories.map((cat, i) => (
              <li key={i}>{cat}</li>
            ))}
          </ul>
        )}
        <div
            className="modal-summary"
            dangerouslySetInnerHTML={{
                __html: article.description?.trim() || '<p>No hay descripción asociada</p>'
            }}
            />
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES') + ' - ' + date.toLocaleTimeString('es-ES');
}

export default ArticleModal;
