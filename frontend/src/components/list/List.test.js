import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import List from './List';

// Mock del componente Article para evitar renderizarlo completo
jest.mock('../article/Article.js', () => ({ title }) => (
  <div data-testid="article">{title}</div>
));

beforeEach(() => {
  // Mock global fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          title: 'Artículo 1',
          publishedAt: '2023-06-10T08:00:00Z',
          description: 'Descripción del artículo 1',
          link: '/articulo-1',
          imageUrl: '/imagen-1.jpg',
          categories: ['noticias'],
          summary: 'Resumen del artículo 1'
        },
        {
          title: 'Artículo 2',
          publishedAt: '2023-06-09T10:00:00Z',
          description: 'Descripción del artículo 2',
          link: '/articulo-2',
          imageUrl: '/imagen-2.jpg',
          categories: ['actualidad'],
          summary: 'Resumen del artículo 2'
        }
      ])
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renderiza artículos después de cargar', async () => {
  render(<List />);

  await waitFor(() => {
    expect(screen.getByText('Artículo 1')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText('Artículo 2')).toBeInTheDocument();
  });
});

test('renderiza el número correcto de artículos', async () => {
  render(<List />);

  const articles = await screen.findAllByTestId('article');
  expect(articles.length).toBe(2);
});

test('maneja correctamente una lista vacía', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(<List />);

  await waitFor(() => {
    expect(screen.queryAllByTestId('article').length).toBe(0);
  });
});

test('maneja errores de red sin romper', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn(() => Promise.reject(new Error('Error de red')));

  render(<List />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching articles:', expect.any(Error));
  });

  consoleSpy.mockRestore();
});
