import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleModal from './ArticleModal';

const mockArticle = {
  title: 'Noticia de prueba',
  link: 'https://example.com',
  publishedAt: '2023-06-15T09:30:00Z',
  categories: ['Tecnología', 'Actualidad'],
  description: '<p>Esta es una descripción <strong>HTML</strong>.</p>',
};

describe('ArticleModal', () => {
  test('renderiza correctamente los datos del artículo', () => {
    render(<ArticleModal article={mockArticle} onClose={() => {}} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Noticia de prueba');
    expect(screen.getByRole('link')).toHaveAttribute('href', mockArticle.link);
    expect(screen.getByText('Tecnología')).toBeInTheDocument();
    expect(screen.getByText('Actualidad')).toBeInTheDocument();
    expect(screen.getByText(/esta es una descripción/i)).toBeInTheDocument();
    expect(screen.getByText(/15\/6\/2023/)).toBeInTheDocument();
  });

  test('muestra mensaje si no hay descripción', () => {
    const articleSinDescripcion = { ...mockArticle, description: '' };
    render(<ArticleModal article={articleSinDescripcion} onClose={() => {}} />);
    expect(screen.getByText(/no hay descripción asociada/i)).toBeInTheDocument();
  });

  test('llama onClose al hacer click en el overlay', () => {
    const onClose = jest.fn();
    render(<ArticleModal article={mockArticle} onClose={onClose} />);

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  test('llama onClose al hacer click en el botón de cerrar', () => {
    const onClose = jest.fn();
    render(<ArticleModal article={mockArticle} onClose={onClose} />);

    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });
});
