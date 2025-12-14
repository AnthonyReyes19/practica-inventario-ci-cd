import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('muestra el título de la aplicación', () => {
    render(<App />);
    // Buscamos la parte fija del título nuevo
    const titulo = screen.getByText(/Inventario \(CI\/CD\)/i);
    expect(titulo).toBeInTheDocument();
  });
});