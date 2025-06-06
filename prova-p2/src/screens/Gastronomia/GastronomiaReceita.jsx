import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const GastronomiaReceita = ({ route, navigation }) => {
  const { receita } = route.params;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card>
        <Card.Title title={receita.nome} subtitle={receita.pais} />
        <Card.Cover source={{ uri: receita.foto }} />
        <Card.Content>
          <Text variant="titleMedium">Ingredientes:</Text>
          <Text>{receita.ingredientes}</Text>
          <Text variant="titleMedium" style={{ marginTop: 10 }}>Modo de Preparo:</Text>
          <Text>{receita.preparo}</Text>
        </Card.Content>
      </Card>
      
      <Button mode="outlined" style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>Voltar</Button>
    </ScrollView>
  );
};

export default GastronomiaReceita;
