import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from 'react-native';

export default function App() {
  // Estados para los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  // Estados para los mensajes de error
  const [errorNombre, setErrorNombre] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  // Estado para controlar el cambio de pantalla
  const [ingresado, setIngresado] = useState(false);

  // Expresión regular estándar para validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleIngresar = () => {
    Keyboard.dismiss();
    let esValido = true;

    // Validar Nombre
    if (!nombre.trim()) {
      setErrorNombre('El nombre es obligatorio.');
      esValido = false;
    } else if (nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres.');
      esValido = false;
    } else {
      setErrorNombre('');
    }

    // Validar Email
    if (!email.trim()) {
      setErrorEmail('El correo electrónico es obligatorio.');
      esValido = false;
    } else if (!regexEmail.test(email.trim())) {
      setErrorEmail('Ingrese un correo electrónico válido (ej: usuario@dominio.com).');
      esValido = false;
    } else {
      setErrorEmail('');
    }

    // Si ambos son válidos, pasamos a la pantalla de saludo
    if (esValido) {
      setIngresado(true);
    }
  };

  const handleReiniciar = () => {
    setNombre('');
    setEmail('');
    setErrorNombre('');
    setErrorEmail('');
    setIngresado(false);
  };

  // Pantalla de Bienvenida / Saludo
  if (ingresado) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.tituloSaludo}>¡Bienvenido/a!</Text>
          <Text style={styles.textoSaludo}>{nombre.trim()}</Text>
          <Text style={styles.textoEmail}>{email.trim().toLowerCase()}</Text>
          <TouchableOpacity style={styles.botonVolver} onPress={handleReiniciar}>
            <Text style={styles.textoBoton}>Volver a iniciar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Pantalla de Formulario
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Acceso al Sistema</Text>

        {/* Campo Nombre */}
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput
          style={[styles.input, errorNombre ? styles.inputError : null]}
          placeholder="Ej: Juan Pérez"
          value={nombre}
          onChangeText={(texto) => {
            setNombre(texto);
            if (errorNombre) setErrorNombre('');
          }}
          autoCapitalize="words"
        />
        {errorNombre ? <Text style={styles.textoError}>{errorNombre}</Text> : null}

        {/* Campo Email */}
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={[styles.input, errorEmail ? styles.inputError : null]}
          placeholder="Ej: alumno@mail.com"
          value={email}
          onChangeText={(texto) => {
            setEmail(texto);
            if (errorEmail) setErrorEmail('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errorEmail ? <Text style={styles.textoError}>{errorEmail}</Text> : null}

        {/* Botón de Enviar */}
        <TouchableOpacity style={styles.boton} onPress={handleIngresar}>
          <Text style={styles.textoBoton}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  textoError: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  boton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  botonVolver: {
    backgroundColor: '#4B5563',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tituloSaludo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    textAlign: 'center',
  },
  textoSaludo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 8,
  },
  textoEmail: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
});