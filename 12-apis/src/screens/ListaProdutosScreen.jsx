import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text, Avatar, useTheme } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoria}`)
      .then(response => setProdutos(response.data.products))
      .catch(error => console.error(error));
  }, [categoria]);

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Card 
          style={styles.card}
          onPress={() => navigation.navigate('Produto', { idProduto: item.id })}
        >
          <Card.Title
            title={item.title}
            titleStyle={styles.cardTitle}
            subtitle={`Categoria: ${categoria}`}
            subtitleStyle={styles.cardSubtitle}
            left={(props) => (
              <Avatar.Image 
                size={44} 
                source={{ uri: item.thumbnail }} 
                style={styles.avatar}
              />
            )}
          />
          <Card.Content style={styles.cardContent}>
            <Text style={styles.price}>{item.price} USD</Text>
            <Text style={styles.brand}>{item.brand || 'Marca não especificada'}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#F5F5F0',
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#5D4037',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    color: '#5D4037',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: -8,
  },
  cardSubtitle: {
    color: '#8D6E63',
    fontSize: 12,
    marginLeft: -8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 12,
  },
  price: {
    color: '#8B5A2B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  brand: {
    color: '#6D4C41',
    fontSize: 14,
    fontStyle: 'italic',
  },
  avatar: {
    backgroundColor: '#D7CCC8',
    borderWidth: 1,
    borderColor: '#BCAAA4',
  },
});