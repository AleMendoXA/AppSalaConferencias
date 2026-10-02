import AsynStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Area_Clave = "Asignar_Area";

const Equipamiento = [
  "Proyector:",
  "Pantalla:",
  "Pizarra: ",
  "Micrófono:",
  "Altavoces:",
  "Cámara:",
  "Conexión a Internet:",
];

export default function App() {
  const [area, setArea] = useState("");
  const [texto, setTexto] = useState("");
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    cargarArea();
  }, []);

  const cargarArea = async () => {
    try {
      const areaGuardada = await AsynStorage.getItem(Area_Clave);
      if (areaGuardada !== null) {
        setArea(areaGuardada);
      }
    } catch (error) {
      Alert.alert("Error al cargar el area asignada");
    }
  };

  const guardarArea = async () => {
    if (texto.trim() === "") {
      Alert.alert("El area no puede estar vacia");
      return;
    }
    try {
      await AsynStorage.setItem(Area_Clave, texto.trim());
      setArea(texto.trim());
      setTexto("");
      Alert.alert("Area correctamente asignada");
    } catch (error) {
      Alert.alert("Error al guardar el area asignada");
    }
  };

  const cambiarDisponibilidad = () => {
    setDisponible(!disponible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Corporate Spaces</Text>
        <Text style={styles.areaTexto}>
          Área encargada: {area !== "" ? area : "Sin asignar"}
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
          }}
          style={styles.imagen}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.nombreSala}>Sala de Conferencias Ejecutiva A-1</Text>
          <Text style={styles.aforo}>Aforo máximo: 25 Personas</Text>
        </View>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Equipamiento disponible</Text>
        {Equipamiento.map((item, index) => (
          <Text key={index} style={styles.item}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Asignar área encargada</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Gerencia de Tecnología"
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.botonGuardar} onPress={guardarArea}>
          <Text style={styles.textoBoton}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.seccion}>
        <TouchableOpacity
          style={[
            styles.botonEstado,
            { backgroundColor: disponible ? "#2e9e4f" : "#d32f2f" },
          ]}
          onPress={cambiarDisponibilidad}
        >
          <Text style={styles.textoBoton}>
            {disponible ? "SALA DISPONIBLE" : "SALA EN USO"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  header: {
    backgroundColor: "#1f3a5f",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  areaTexto: {
    color: "#cfd8e3",
    fontSize: 16,
    marginTop: 6,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  cardInfo: {
    padding: 14,
  },
  nombreSala: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f3a5f",
  },
  aforo: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  seccion: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f3a5f",
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  botonGuardar: {
    backgroundColor: "#1f3a5f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botonEstado: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});