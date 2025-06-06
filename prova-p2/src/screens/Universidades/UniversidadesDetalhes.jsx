import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function UniversidadesDetalhes({ route, navigation }) {
  const { universidade } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{universidade.name}</Text>
      <Text>País: {universidade.country}</Text>
      <Text>Website: {universidade.web_pages[0]}</Text>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
        Voltar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
