import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/carousel/CarouselTop.js', () => () => <div data-testid="carousel">Carousel Component</div>);
jest.mock('./components/list/list.js', () => () => <div data-testid="list">List Component</div>);

describe('App component', () => {

  test('renderiza los componentes Carousel y List', () => {
    render(<App />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });


  test('el botón "OTRAS NOTICIAS" dispara scroll hacia abajo', () => {
    window.scrollTo = jest.fn();
    render(<App />);

    const button = screen.getByText(/otras noticias/i);
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  });
});
