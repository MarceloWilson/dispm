import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native'; 
import { Card, Text, Button } from 'react-native-paper';

const TradicoesDetalhes = ({ route, navigation }) => {
  const { tradicao } = route.params;

  console.log('Tradicao recebida no detalhe:', tradicao);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={tradicao.nome} subtitle={tradicao.pais} />
        <Card.Content>
          {tradicao.foto ? ( 
            <Image source={{ uri: tradicao.foto }} style={styles.image} />
          ) : null}

          <Text variant="titleMedium" style={styles.title}>Data da Tradição:</Text>
          <Text style={styles.text}>{tradicao.dataTradicao}</Text>

          <Text variant="titleMedium" style={styles.title}>Local da tradição:</Text>
          <Text style={styles.text}>{tradicao.local}</Text>

        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Voltar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: { marginBottom: 20 },
  title: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  text: { fontSize: 14, color: '#333' },
  image: {
    width: '100%',
    height: 200, 
    resizeMode: 'cover', 
    marginBottom: 16,
    borderRadius: 8,
  },
  button: { marginTop: 10 }
});

export default TradicoesDetalhes;