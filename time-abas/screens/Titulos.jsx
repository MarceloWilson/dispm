import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const titulos = [
  {
    nome: "Copa Intercontinental (Mundial)",
    anos: [1981],
  },
  {
    nome: "Copa Libertadores da América",
    anos: [1981, 2019, 2022],
  },
  {
    nome: "Campeonato Brasileiro",
    anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020],
  },
  {
    nome: "Copa do Brasil",
    anos: [1990, 2006, 2013, 2022, 2024],
  },
  {
    nome: "Supercopa do Brasil",
    anos: [2020, 2021, 2025],
  },
  {
    nome: "Recopa Sul-Americana",
    anos: [2020],
  },
  {
    nome: "Copa Mercosul",
    anos: [1999],
  },
];

export default function Titulos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏆 Títulos do Mengão</Text>
      <FlatList
        data={titulos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.anos}>{item.anos.join(', ')}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  anos: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
