import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const TradicoesDetalhes = ({ route, navigation }) => {
  const { tradicao } = route.params;

  console.log('Tradicao recebida no detalhe:', tradicao);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={tradicao.nome} subtitle={tradicao.pais} />
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>Descrição:</Text>
          <Text style={styles.text}>{tradicao.descricao}</Text>

          <Text variant="titleMedium" style={styles.title}>Data da Tradição:</Text>
          <Text style={styles.text}>{tradicao.data}</Text>

          {/* Se precisar mostrar mais campos, coloque aqui */}
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
  button: { marginTop: 10 }
});

export default TradicoesDetalhes;
