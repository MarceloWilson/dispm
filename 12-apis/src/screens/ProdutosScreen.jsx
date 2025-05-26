import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState({});
  const [tempo, setTempo] = useState(0);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    const start = Date.now();
    axios.get(`https://dummyjson.com/products/${idProduto}?delay=3000`)
      .then(response => {
        setProduto(response.data);
        const end = Date.now();
        setTempo(((end - start) / 1000).toFixed(2));
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [idProduto]);

  const url = `https://dummyjson.com/products/${idProduto}?delay=3000`;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#8B5A2B" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title={produto.title || 'Sem título'} 
          titleStyle={styles.cardTitle}
        />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.description}>{produto.description || 'Sem descrição'}</Text>
          <Text style={styles.price}>Preço: {produto.price || 'N/A'} USD</Text>
          <Text style={styles.url}>URL: {url}</Text>
          <Text style={styles.tempo}>Tempo de carregamento: {tempo} segundos</Text>
        </Card.Content>
        {produto.thumbnail && (
          <Card.Cover 
            source={{ uri: produto.thumbnail }} 
            style={styles.thumbnail} 
          />
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F5F5F0',
  },
  card: {
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#5D4037',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardTitle: {
    color: '#5D4037',
    fontSize: 22,
    fontWeight: '600',
  },
  cardContent: {
    paddingVertical: 15,
  },
  description: {
    color: '#4E342E',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  price: {
    color: '#8B5A2B',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  url: {
    color: '#A1887F',
    fontSize: 14,
    marginVertical: 5,
    fontStyle: 'italic',
  },
  tempo: {
    color: '#6D4C41',
    fontSize: 14,
    marginVertical: 5,
  },
  thumbnail: {
    margin: 15,
    borderRadius: 8,
    height: 200,
    backgroundColor: '#D7CCC8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F0',
  },
  loadingText: {
    marginTop: 15,
    color: '#5D4037',
    fontSize: 16,
  },
});