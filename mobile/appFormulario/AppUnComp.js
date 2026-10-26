/**
 * ESTE ES EL CÓDIGO QUE ORIGINALMENTE TRABAJAMOS EN LA CLASE #20
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

/** FUNCIÓN PRINCIPAL */
export default function AppUnComponente() {
  // Estado para guardar el nombre tipeado
  const [nombre, setNombre] = useState(''); // <-----  ¿Qué es esto????
  
  // Estado para controlar si ya se envió el formulario y mostrar el saludo
  const [saludado, setSaludado] = useState(false);   //<---- FLAG

  // Función al presionar el botón de Ingresar
  const handleIngresar = () => {
    if (nombre.trim() !== '') {
      setSaludado(true);
    }
  };

  // Función para volver a la pantalla inicial
  const handleVolver = () => {
    setNombre('');   //Borra el nombre ya saludado.
    setSaludado(false);  //Reestablece la bandera 'saludado' a FALSE.
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      { !saludado ? (     //  if ( saludado.value == FALSE ) {
            /* --- PANTALLA 1: FORMULARIO --- */
        <View style={styles.card}>
          <Text style={styles.titulo}>Bienvenido/a</Text>
          <Text style={styles.subtitulo}>Por favor, ingresá tu nombre para continuar:</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: Profe"
            placeholderTextColor="#a0aec0"
            value={nombre}
            onChangeText={setNombre}   //  onXXXXX   <----- EVENTOS
            autoCapitalize="words"
          />

          <TouchableOpacity 
            style={[styles.boton, nombre.trim() === '' && styles.botonDeshabilitado]} 
            onPress={handleIngresar}
            disabled={nombre.trim() === ''}
          >
            <Text style={styles.textoBoton}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      ) : (        //    }  else {
        /* --- PANTALLA 2: SALUDO --- */
        <View style={styles.card}>
          <Text style={styles.saludoEmoji}>👋</Text>
          <Text style={styles.tituloSaludo}>¡Bienvenido, {nombre}!</Text>
          <Text style={styles.subtitulo}>Hemos recibido tu formulario</Text>

          <TouchableOpacity 
            style={[styles.boton, styles.botonVolver]} 
            onPress={handleVolver}
          >
            <Text style={styles.textoBoton}>Volver a iniciar</Text>
          </TouchableOpacity>
        </View>
      )         //      } <-- else
      }
    </KeyboardAvoidingView>
  );   //  <--- FIN del RETURN.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00', // Azul muy claro de fondo
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
    elevation: 5, // Sombra para Android
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
    backgroundColor: '#111c7e', // Azul para salir o volver
    marginTop: 10,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});