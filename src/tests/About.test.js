import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('2- Teste o componente About.js', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const about = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphes = screen.getAllByText(/Pokémons/i);
    expect(paragraphes.length).toBe(2);
  });

  test('Teste se a página contém a imagem correta da Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveAttribute('src', link);
  });
});
