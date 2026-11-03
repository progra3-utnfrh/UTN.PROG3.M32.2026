import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
// URL del endpoint que consulta la base de datos
const API_URL = 'http://localhost:3000/api/base/';

export default function App() {   //  ---> int main ()
  // Estados para almacenar la lista de productos, el estado de carga y errores
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función que consulta el endpoint remoto mediante Promesas (.then / .catch)
  const consultarProductos = () => {
    setCargando(true);
    setError(null);
    fetch(API_URL)    //ACÁ ES DONDE SE CONECTA A LA BD Y TRAE EN STRING CON EL RESULTADO DE LA CONSULTA.
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        if (json.status === 'success') {
          setProductos(json.data);
        } else if (Array.isArray(json)) {
// Soporte directo por si el endpoint devuelve el array de filas directamente
          setProductos(json);
        } else {
          throw new Error(json.message || 'Formato de respuesta no reconocido');
        }
      })
      .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
        setError('No se pudo obtener la información desde https://progra3/api/base/');
      })
      .finally(() => {
        setCargando(false);
      });
  };
  // useEffect ejecuta la consulta automáticamente al abrir la pantalla
  useEffect(() => {
    consultarProductos();
  }, []);
  // Función encargada de dibujar cada fila de la tabla productos01
  const renderProducto = ({ item }) => {
    const sinStock = Number(item.stock) === 0;
    return (        // JSX = JavaScript XML,   XML = eXtended Markup Language
      <View style={styles.card}>      
        <View style={styles.cardHeader}>
          <Text style={styles.idTexto}>ID #{item.id}</Text>
          <Text style={styles.marcaTexto}>{item.marca}</Text>
        </View>
        <Text style={styles.descripcionTexto}>{item.descripcion}</Text>
        <View style={styles.cardFooter}>
          <Text style={[
            styles.stockBadge,
            sinStock ? styles.sinStock : styles.conStock
          ]}>
            {sinStock ? 'SIN STOCK' : `Stock: ${item.stock} unidades`}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Catálogo de Productos</Text>
        <Text style={styles.subtitulo}>Tabla: productos01 | Origen: https://progra3/api/base/</Text>
      </View>
      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2b6cb0" />
          <Text style={styles.textoEstado}>Consultando base de datos...</Text>
        </View>
      ) : error ? (
        <View style={styles.centro}>
          <Text style={styles.textoError}>{error}</Text>
          <TouchableOpacity style={styles.botonReintentar} onPress={consultarProductos}>
            <Text style={styles.textoBoton}>Reintentar consulta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProducto}
          contentContainerStyle={styles.lista}
          onRefresh={consultarProductos}
          refreshing={cargando}
          ListEmptyComponent={
            <Text style={styles.textoEstado}>No hay productos cargados en productos01.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 35,
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d9e2ec',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#102a43',
  },
  subtitulo: {
    fontSize: 12,
    color: '#627d98',
    marginTop: 4,
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  idTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#829ab1',
  },
  marcaTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2b6cb0',
    textTransform: 'uppercase',
  },
  descripcionTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#243b53',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stockBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  conStock: {
    backgroundColor: '#c6f6d5',
    color: '#22543d',
  },
  sinStock: {
    backgroundColor: '#fed7d7',
    color: '#742a2a',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  textoEstado: {
    marginTop: 12,
    color: '#486581',
    fontSize: 15,
    textAlign: 'center',
  },
  textoError: {
    color: '#c53030',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  botonReintentar: {
    backgroundColor: '#3182ce',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});