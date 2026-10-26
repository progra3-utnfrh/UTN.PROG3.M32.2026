import React from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet } from 'react-native';

export default function FormularioCard({ nombre, setNombre, onIngresar }) {
  const esInvalido = nombre.trim() === '';

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Bienvenido/a</Text>
      <Text style={styles.subtitulo}>Por favor, ingresá tu nombre para continuar:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Profe"
        placeholderTextColor="#a0aec0"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="words"
      />

      <TouchableOpacity 
        style={[styles.boton, esInvalido && styles.botonDeshabilitado]} 
        onPress={onIngresar}
        disabled={esInvalido}
      >
        <Text style={styles.textoBoton}>Ingresar</Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#cbd5e0',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2d3748',
    backgroundColor: '#f7fafc',
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
  botonDeshabilitado: {
    backgroundColor: '#a0aec0',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});