import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const GastronomiaReceita = ({ route, navigation }) => {
  const { receita } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={receita.nome} subtitle={receita.pais} />
        {receita.foto && <Card.Cover source={{ uri: receita.foto }} />}
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>Ingredientes:</Text>
          <Text style={styles.text}>{receita.ingredientes}</Text>

          <Text variant="titleMedium" style={[styles.sectionTitle, { marginTop: 12 }]}>Modo de Preparo:</Text>
          <Text style={styles.text}>{receita.preparo}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        Voltar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff', 
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 4,
    fontSize: 14,
    color: '#333', 
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default GastronomiaReceita;
