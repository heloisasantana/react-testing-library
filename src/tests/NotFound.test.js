import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('4- Teste o componente NotFound.js', () => {
  test('Teste se a página contém um heading h2 com o texto correto', () => {
    render(<NotFound />);
    const objInfo = { level: 2, name: /Page requested not found/i };
    const pageNotFound = screen.getByRole('heading', objInfo);
    expect(pageNotFound).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem correta', () => {
    render(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', link);
  });
});
