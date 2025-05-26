import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category-list')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  }, []);

  const formatCategoryName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card 
            style={styles.card}
            onPress={() => navigation.navigate('ListaProdutos', { categoria: item })}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.categoryText}>
                {formatCategoryName(item)}
              </Text>
              <Text style={styles.arrow}>→</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

//estlização feita por IA - em todos os screens
// e com base no tema do react-native-paper
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
    paddingHorizontal: 12,
  },
  header: {
    color: '#5D4037',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
    marginLeft: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#5D4037',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 6,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  categoryText: {
    color: '#5D4037',
    fontSize: 16,
    fontWeight: '500',
  },
  arrow: {
    color: '#8B5A2B',
    fontSize: 20,
    fontWeight: 'bold',
  },
});