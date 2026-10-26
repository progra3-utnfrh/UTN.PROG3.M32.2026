import React from 'react';
import AppUnComponente from './AppUnComponente';
import AppDosComponentes from './AppDosComponentes';

// FLAG DE CONFIGURACIÓN
// cambialo a 'false' para ver el monolítico, o 'true' para la versión en 2 componentes
const USAR_REFACTORIZADO = true;

export default function App() {
  if (USAR_REFACTORIZADO) {
    return <AppDosComponentes />;
  }

  return <AppUnComponente />;
}