import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function ReceitasLista({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(json => setCategorias(json.categories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={item => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ReceitasPorCategoria', { categoria: item.strCategory })}
          >
            <Text style={styles.text}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding: 16},
  item: {padding: 16, backgroundColor: '#eee', marginBottom: 8, borderRadius: 6},
  text: {fontSize: 18, fontWeight: 'bold'}
});
