import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('muestra el título de la aplicación', () => {
    render(<App />);
    const titulo = screen.getByText(/Inventario Web \(CI\/CD Activo\)/i);    
    expect(titulo).toBeInTheDocument();
  });
});