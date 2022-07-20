import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5- Teste o componente Pokedex.js', () => {
  const testID = 'pokemon-name';

  test('Teste se a página contém um heading h2 com o texto correto', () => {
    renderWithRouter(<App />);
    const objInfo = { level: 2, name: /Encountered pokémons/i };
    const head = screen.getByRole('heading', objInfo);
    expect(head).toBeInTheDocument();
  });

  test('Teste se exibe o próximo quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nameA = screen.getByTestId(testID);
    expect(nameA.innerHTML).toBe('Pikachu');
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(nameA.innerHTML).toBe('Charmander');
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const names = screen.getAllByTestId(testID);
    const bool = (names.length === Number('1'));
    expect(bool).toBe(true);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filters = screen.getAllByTestId('pokemon-type-button');
    const bool = (filters.length === Number('7'));
    expect(bool).toBe(true);
    const filter = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(filter);
    const nameB = screen.getByTestId(testID);
    expect(nameB.innerHTML).toBe('Alakazam');
    const reset = screen.getByRole('button', { name: /All/i });
    expect(reset).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const noFilter = screen.getByRole('button', { name: /All/i });
    expect(noFilter).toBeInTheDocument();
    userEvent.click(noFilter);
    const nameC = screen.getByTestId(testID);
    expect(nameC.innerHTML).toBe('Pikachu');
  });
});
