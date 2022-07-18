import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1- Teste o componente App.js', () => {
  test('Teste se o topo contém o conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(home && about && favPokemons).toBeInTheDocument();
  });

  test('Teste se redireciona para "/" ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se redireciona para "/about" ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se redireciona para "/favorites" ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se redireciona para Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-exist');
    const { pathname } = history.location;
    expect(pathname).toBe('/page-not-exist');
    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
