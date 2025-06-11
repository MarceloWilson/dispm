import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { Card, Button, Text, FAB, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TradicoesLista = ({ navigation }) => {
  const [tradicoes, setTradicoes] = useState([]);
  const { colors } = useTheme();

  const carregar = async () => {
    const data = await AsyncStorage.getItem('tradicoes');
    setTradicoes(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar);
    return unsubscribe;
  }, [navigation]);

  const confirmarExclusao = (index) => {
    Alert.alert('Confirmar', 'Deseja excluir esta tradição?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const novaLista = tradicoes.filter((_, i) => i !== index);
          await AsyncStorage.setItem('tradicoes', JSON.stringify(novaLista));
          carregar();
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <Card style={styles.card} key={index}>
      {item.foto ? (
        <Card.Cover source={{ uri: item.foto }} style={styles.cardCover} />
      ) : null}
      <Card.Title title={item.nome} subtitle={item.pais} />
      <Card.Content>
        <Text>{item.descricao}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => navigation.navigate('TradicoesDetalhes', { tradicao: item })}
          textColor={colors.primary}
        >
          Ver Detalhes
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('TradicoesCadastro', { tradicao: item, index })}
          style={styles.editButton}
        >
          Editar
        </Button>
        <Button
          mode="text"
          onPress={() => confirmarExclusao(index)}
          textColor={colors.error}
        >
          Excluir
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {tradicoes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={styles.emptyText}>
            Nenhuma tradição cadastrada ainda
          </Text>
        </View>
      ) : (
        <FlatList
          data={tradicoes}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
        />
      )}

      <FAB
        icon="plus"
        label="Nova Tradição"
        color={colors.onPrimary}
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TradicoesCadastro')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image:{
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardCover: {
    height: 150,
  },
  editButton: {
    marginLeft: 8,
    borderWidth: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    borderRadius: 50,
  },
});

export default TradicoesLista;