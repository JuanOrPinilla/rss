import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Article from './Article';

const mockArticle = {
  title: 'Título de prueba',
  publishedAt: '2023-06-15T09:30:00Z',
  summary: 'Este es un resumen de prueba',
  description: '<p>Descripción con <strong>HTML</strong></p>',
  categories: ['Tech', 'News'],
  imageUrl: 'https://example.com/image.jpg',
  link: 'https://example.com',
};

describe('Article component', () => {
  test('renderiza el título, la fecha y el resumen', () => {
    render(<Article {...mockArticle} />);
    
    expect(screen.getByText(/título de prueba/i)).toBeInTheDocument();
    expect(screen.getByText(/este es un resumen/i)).toBeInTheDocument();
    expect(screen.getByText(/15\/6\/2023/)).toBeInTheDocument();
  });

  test('muestra el modal al hacer clic en el artículo', () => {
  render(<Article {...mockArticle} />);

  const article = screen.getByText(/título de prueba/i);
  fireEvent.click(article);

  const modalTitles = screen.getAllByText(/título de prueba/i);
});

  test('agrega clase "visited" después del clic', () => {
    const { container } = render(<Article {...mockArticle} />);
    const articleCard = screen.getByRole('article');

    expect(articleCard.classList.contains('visited')).toBe(false);

    fireEvent.click(articleCard);

    expect(articleCard.classList.contains('visited')).toBe(true);
  });

  test('muestra mensaje por defecto si el summary está vacío', () => {
    const propsWithoutSummary = { ...mockArticle, summary: '' };
    render(<Article {...propsWithoutSummary} />);

    expect(screen.getByText(/no hay descripción asociada/i)).toBeInTheDocument();
  });
});
