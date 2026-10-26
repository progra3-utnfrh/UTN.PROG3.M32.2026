import React, { useState } from 'react';
import { StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import FormularioCard from './src/components/FormularioCard';
import SaludoCard from './src/components/SaludoCard';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [saludado, setSaludado] = useState(false);

  const handleIngresar = () => {
    if (nombre.trim() !== '') {
      setSaludado(true);
    }
  };

  const handleVolver = () => {
    setNombre('');
    setSaludado(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {!saludado ? (
        <FormularioCard 
          nombre={nombre} 
          setNombre={setNombre} 
          onIngresar={handleIngresar} 
        />
      ) : (
        <SaludoCard 
          nombre={nombre} 
          onVolver={handleVolver} 
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});