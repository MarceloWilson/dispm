import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Card, Button, Text, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const GastronomiaList = ({ navigation }) => {
  const [receitas, setReceitas] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarReceitas();
  }, [isFocused]);

  const carregarReceitas = async () => {
    const data = await AsyncStorage.getItem('receitas');
    if (data) setReceitas(JSON.parse(data));
  };

  const excluirReceita = (index) => {
    Alert.alert('Confirmar', 'Deseja excluir esta receita?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', onPress: async () => {
          const novaLista = receitas.filter((_, i) => i !== index);
          await AsyncStorage.setItem('receitas', JSON.stringify(novaLista));
          setReceitas(novaLista);
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {receitas.map((item, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Card.Title title={item.nome} subtitle={item.pais} />
          <Card.Actions>
            <Button onPress={() => navigation.navigate('GastronomiaReceita', { receita: item })}>Ver</Button>
            <Button onPress={() => navigation.navigate('GastronomiaCadastro', { receita: item, index })}>Editar</Button>
            <Button onPress={() => excluirReceita(index)}>Excluir</Button>
          </Card.Actions>
        </Card>
      ))}
      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        onPress={() => navigation.navigate('GastronomiaCadastro')}
      />
    </View>
  );
};

export default GastronomiaList;
