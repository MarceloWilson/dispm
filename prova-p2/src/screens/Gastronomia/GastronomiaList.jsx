import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Image, FlatList } from 'react-native';
import { Card, Button, Text, FAB, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const GastronomiaList = ({ navigation }) => {
  const [receitas, setReceitas] = useState([]);
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  useEffect(() => {
    carregarReceitas();
  }, [isFocused]);

  const carregarReceitas = async () => {
    const data = await AsyncStorage.getItem('receitas');
    setReceitas(data ? JSON.parse(data) : []);
  };

  const excluirReceita = (index) => {
    Alert.alert('Confirmar', 'Deseja excluir esta receita?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const novaLista = receitas.filter((_, i) => i !== index);
          await AsyncStorage.setItem('receitas', JSON.stringify(novaLista));
          setReceitas(novaLista);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <Card style={styles.card} key={index}>
      <Card.Title title={item.nome} subtitle={item.pais} />
      {item.foto && (
        <Card.Content style={styles.cardContent}>
          <Image source={{ uri: item.foto }} style={styles.image} />
        </Card.Content>
      )}
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="text"
          onPress={() => navigation.navigate('GastronomiaReceita', { receita: item })}
          textColor={colors.primary}
        >
          Ver Detalhes
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('GastronomiaCadastro', { receita: item, index })}
          style={styles.editButton}
        >
          Editar
        </Button>
        <Button
          mode="text"
          onPress={() => excluirReceita(index)}
          textColor={colors.error}
        >
          Excluir
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {receitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={styles.emptyText}>
            Nenhuma receita cadastrada ainda
          </Text>
        </View>
      ) : (
        <FlatList
          data={receitas}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
        />
      )}

      <FAB
        icon="plus"
        label="Nova Receita"
        color={colors.onPrimary}
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('GastronomiaCadastro')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cardActions: {
    justifyContent: 'flex-end',
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

export default GastronomiaList;
