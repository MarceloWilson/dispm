import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const TradicoesDetalhes = ({ route, navigation }) => {
  const { tradicao } = route.params;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card>
        <Card.Title title={tradicao.nome} subtitle={tradicao.pais} />
        <Card.Content>
          <Text variant="titleMedium">Descrição:</Text>
          <Text>{tradicao.descricao}</Text>

          <Text variant="titleMedium" style={{ marginTop: 10 }}>Data:</Text>
          <Text>{tradicao.data}</Text>

          <Text variant="titleMedium" style={{ marginTop: 10 }}>Vestimenta Típica:</Text>
          <Text>{tradicao.vestimenta}</Text>
        </Card.Content>
      </Card>

      <Button mode="outlined" style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>Voltar</Button>
    </ScrollView>
  );
};

export default TradicoesDetalhes;

