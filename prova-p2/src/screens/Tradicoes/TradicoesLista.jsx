import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TradicoesLista = ({ navigation }) => {
  const [tradicoes, setTradicoes] = useState([]);

  const carregar = async () => {
    const data = await AsyncStorage.getItem('tradicoes');
    setTradicoes(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar);
    return unsubscribe;
  }, [navigation]);

  const excluir = async (index) => {
    const novaLista = [...tradicoes];
    novaLista.splice(index, 1);
    await AsyncStorage.setItem('tradicoes', JSON.stringify(novaLista));
    carregar();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button mode="contained" onPress={() => navigation.navigate('TradicoesCadastro')}>Nova Tradição</Button>
      <FlatList
        data={tradicoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ marginVertical: 5 }}>
            <Card.Title title={item.nome} subtitle={item.pais} />
            <Card.Content>
              <Text>{item.descricao}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('TradicoesDetalhes', { tradicao: item })}>Ver Detalhes</Button>
              <Button onPress={() => navigation.navigate('TradicoesCadastro', { tradicao: item, index })}>Editar</Button>
              <Button onPress={() => excluir(index)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

export default TradicoesLista;
