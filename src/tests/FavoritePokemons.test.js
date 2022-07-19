import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('3- Teste o componente FavoritePokemon.js', () => {
  test('Teste se é exibida a mensagem correta, caso a pessoa não tenha favoritos', () => {
    render(<FavoritePokemons />);
    const noFavPokemons = screen.getByText(/No favorite pokemon found/i);
    expect(noFavPokemons).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const pokemonsFavs = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavs } />);
    const nameOne = screen.getByText(/Pikachu/i);
    const typeOne = screen.getByText(/Electric/i);
    const averageWeightOne = screen.getByText(/Average weight: 6.0 kg/i);
    const imgOne = screen.getByAltText(/Pikachu sprite/i);

    const nameTwo = screen.getByText(/Charmander/i);
    const typeTwo = screen.getByText(/Fire/i);
    const averageWeightTwo = screen.getByText(/Average weight: 8.5 kg/i);
    const imgTwo = screen.getByAltText(/Charmander sprite/i);

    expect(nameOne && typeOne && averageWeightOne && imgOne).toBeInTheDocument();
    expect(nameTwo && typeTwo && averageWeightTwo && imgTwo).toBeInTheDocument();
  });
});
