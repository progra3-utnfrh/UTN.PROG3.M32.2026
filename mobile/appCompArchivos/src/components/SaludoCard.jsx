import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SaludoCard({ nombre, onVolver }) {
  return (
    <View style={styles.card}>
      <Text style={styles.saludoEmoji}>👋</Text>
      <Text style={styles.tituloSaludo}>¡Bienvenido, {nombre}!</Text>
      <Text style={styles.subtitulo}>Hemos recibido tu formulario</Text>

      <TouchableOpacity 
        style={[styles.boton, styles.botonVolver]} 
        onPress={onVolver}
      >
        <Text style={styles.textoBoton}>Volver a iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  saludoEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  tituloSaludo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  boton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3182ce',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonVolver: {
    backgroundColor: '#111c7e',
    marginTop: 10,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});