import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6- Teste o componente Pokemon.js', () => {
  const pokemonTest = {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  };

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTest } />);
    const name = screen.getByText('Charmander');
    const type = screen.getByText('Fire');
    const averageWeight = screen.getByText('Average weight: 8.5 kg');
    const img = screen.getByAltText('Charmander sprite');

    expect(name && type && averageWeight && img).toBeInTheDocument();
    const src = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    expect(img).toHaveAttribute('src', src);
  });

  test('Teste se no card do pokémon contém un link para seus detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTest } />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
  });

  test('Teste se ao clicar no link do pokémon, é redirecionado aos seus detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemonTest } />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');

    const toFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(toFavorite).toBeInTheDocument();
    userEvent.click(toFavorite);
    const icon = screen.getByAltText('Charmander is marked as favorite');
    expect(icon).toBeInTheDocument();
    const src = '/star-icon.svg';
    expect(icon).toHaveAttribute('src', src);
  });
});
