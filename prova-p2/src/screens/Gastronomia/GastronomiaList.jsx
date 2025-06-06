import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Image, ScrollView } from 'react-native';
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
    if (data) setReceitas(JSON.parse(data));
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
        }
      }
    ]);
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.container}>
          {receitas.length > 0 ? (
            receitas.map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Title
                  title={item.nome}
                  titleStyle={styles.cardTitle}
                  subtitle={item.pais}
                  subtitleStyle={styles.cardSubtitle}
                />

                <Card.Content style={styles.cardContent}>
                  {item.foto && (
                    <Image
                      source={{ uri: item.foto }}
                      style={styles.image}
                    />
                  )}
                </Card.Content>

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
                </Card.Actions>
              </Card>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text variant="titleMedium" style={styles.emptyText}>
                Nenhuma receita cadastrada ainda
              </Text>
            </View>
          )}
          {/* Adiciona um espaço no final da lista para o FAB não cobrir o último item */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* FAB Fixo no Topo (fora do ScrollView) */}
      <FAB
        icon="plus"
        label="Nova Receita"
        color={colors.onPrimary}
        style={[styles.fabFixedTop, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate('GastronomiaCadastro')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80, // Espaço para o FAB fixo no topo
  },
  card: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  cardContent: {
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#666',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  editButton: {
    marginLeft: 8,
    borderWidth: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  fabFixedTop: {
    justifyContent: 'center',
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
    borderRadius: 50,
  },
});

export default GastronomiaList;