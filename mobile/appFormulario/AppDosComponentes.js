/**
Código en componentes independientes:
Para separar la interfaz en componentes independientes, creamos
dos componentes funcionales dedicados (FormularioCard y SaludoCard).
Esta separación permite que el componente principal App se encargue
únicamente de gestionar el estado global de la pantalla, mientras
que cada subsistema asume la responsabilidad de rendirizar su propio
marcado y estilos
 */
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

/** 1. COMPONENTE PANTALLA 1: FORMULARIO */
const FormularioCard = ({ nombre, setNombre, onIngresar }) => {
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
};

/** 2. COMPONENTE PANTALLA 2: SALUDO */
const SaludoCard = ({ nombre, onVolver }) => {
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
};

/** 3. COMPONENTE PRINCIPAL */
export default function AppDosComponentes() {
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