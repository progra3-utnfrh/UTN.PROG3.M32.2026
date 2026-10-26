import React from 'react';
import AppDosComponentes from './AppDosComponentes';
import AppUnComponente from './AppUnComp';

// FLAG DE CONFIGURACIÓN
// cambialo a 'false' para ver el monolítico, o 'true' para la versión en 2 componentes
const USAR_DOS_COMPONENTES = false;

export default function App() {
  if (USAR_DOS_COMPONENTES) {
    return <AppDosComponentes />;
  }

  return <AppUnComponente />;
}