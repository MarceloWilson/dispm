import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function UniversidadesLista({ navigation }) {
  const [universidades, setUniversidades] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarUniversidades();
  }, []);

  const carregarUniversidades = async () => {
    try {
      const response = await fetch('http://universities.hipolabs.com/search?country=Brazil');
      const data = await response.json();
      setUniversidades(data);
    } catch (error) {
      console.error('Erro ao carregar universidades:', error);
    } finally {
      setLoading(false);
    }
  };

  const universidadesFiltradas = universidades.filter((uni) => 
    uni.name.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('UniversidadesDetalhes', { universidade: item })}
    >
      <Text style={styles.nome}>{item.name}</Text>
      <Text style={styles.site}>{item.web_pages[0]}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar universidade..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={universidadesFiltradas.slice(0, 10)} // Exibe até 10 resultados filtrados
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  site: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
