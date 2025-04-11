import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const time = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
  fundacao: "17 de novembro de 1895",
  apelido: "Mengão",
  historia: `O Clube de Regatas do Flamengo foi fundado em 1895 como um clube de remo, mas se destacou mundialmente no futebol.
  Ao longo dos anos, o Flamengo se tornou o time mais popular do Brasil, com uma torcida apaixonada. 
  Conquistou títulos históricos como a Copa Libertadores da América, o Campeonato Brasileiro, a Copa do Brasil e o Mundial Interclubes de 1981. 
  Seu elenco sempre contou com craques como Zico, Adriano, Gabigol, entre outros.`,
};

const trofeus = [
  {
    nome: "Libertadores",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Trof%C3%A9u_Copa_Libertadores.png/330px-Trof%C3%A9u_Copa_Libertadores.png"
  },
  {
    nome: "Brasileirão",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/6/6b/Trof%C3%A9u_Campeonato_Brasileiro_S%C3%A9rie_A.png"
  },
  {
    nome: "Copa do Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/thumb/f/f4/Ta%C3%A7a_Copa_do_Brasil.png/220px-Ta%C3%A7a_Copa_do_Brasil.png"
  },
  {
    nome: "Campeonato Carioca",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/6/64/Trof%C3%A9u_Campeonato_Carioca.png"
  },
  {
    nome: "Recopa",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/7/72/Trof%C3%A9u_Recopa_Sul-Americana.png"
  },
  {
    nome: "Copa Mercosul",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/b/b3/Ta%C3%A7a_Copa_Mercosul.png"
  },
  {
    nome: "Mundial 1981",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Intercontinental_Cup_%281960-2004%29_trophy.png/220px-Intercontinental_Cup_%281960-2004%29_trophy.png"
  },
  {
    nome: "Supercopa",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/7/7b/Trof%C3%A9u_Supercopa_do_Brasil.png"
  }
];

export default function Escudo() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{time.nome}</Text>
      <Image source={{ uri: time.escudo }} style={styles.escudo} />
      <Text style={styles.info}>Apelido: {time.apelido}</Text>
      <Text style={styles.info}>Fundado em: {time.fundacao}</Text>
      <Text style={styles.historia}>{time.historia}</Text>

      <Text style={styles.subtitulo}>🏆 Títulos mais importantes</Text>
      {trofeus.map((trofeu, index) => (
        <View key={index} style={styles.trofeuCard}>
          <Image source={{ uri: trofeu.imagem }} style={styles.trofeuImagem} />
          <Text style={styles.trofeuTexto}>{trofeu.nome}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  escudo: {
    width: 120,
    height: 120,
    marginVertical: 20,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  info: {
    fontSize: 15,
    fontFamily: 'Poppins',
    marginVertical: 2,
    textAlign: 'center',
  },
  historia: {
    fontSize: 15,
    fontFamily: 'Poppins',
    marginVertical: 10,
    textAlign: 'justify',
    lineHeight: 22,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins',
    marginTop: 20,
    marginBottom: 10,
  },
  trofeuCard: {
    alignItems: 'center',
    marginBottom: 15,
  },
  trofeuImagem: {
    width: 90,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  trofeuTexto: {
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});