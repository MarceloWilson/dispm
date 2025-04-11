import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

const jogadores = [
  {
    nome: "Zico",
    numero: 10,
    imagem: "https://lncimg.lance.com.br/uploads/2016/11/24/583758130ed78.jpeg"
  },
  {
    nome: "Arrascaeta",
    numero: 10,
    imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg"
  },
  {
    nome: "Leandro",
    numero: 2,
    imagem: "https://colunadofla.com/wp-content/uploads/2015/03/leandro1.jpg"
  },
  {
    nome: "Ronaldo Angelim",
    numero: 4,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp1YWXoudV5d-htdkF51W0RlPfr6VX4oGw0A&s"
  },
  {
    nome: "Pedro",
    numero: 21,
    imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg"
  },
];

export default function Jogadores() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👕 Jogadores do Mengão</Text>
      <FlatList
        data={jogadores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.numero}>Camisa {item.numero}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  imagem: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  numero: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'Poppins',
  },
});