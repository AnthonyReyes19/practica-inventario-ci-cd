import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Simulamos la función fetch globalmente
vi.stubGlobal('fetch', vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true
  })
));