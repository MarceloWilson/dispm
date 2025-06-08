import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export default function ReceitasPorCategoria({ route, navigation }) {
  const { categoria } = route.params;
  const [receitasApi, setReceitasApi] = useState([]);
  const [receitasLocais, setReceitasLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar receitas da API
  const carregarApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
      const json = await res.json();
      setReceitasApi(json.meals || []);
    } catch (e) {
      setReceitasApi([]);
    }
    setLoading(false);
  };

  // Função para carregar receitas locais da categoria
  const carregarLocais = async () => {
    const data = await AsyncStorage.getItem('receitasLocais');
    if (data) {
      const todasLocais = JSON.parse(data);
      const filtradas = todasLocais.filter(r => r.categoria === categoria);
      setReceitasLocais(filtradas);
    } else {
      setReceitasLocais([]);
    }
  };

  // Recarrega toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarApi();
      carregarLocais();
    }, [categoria])
  );

  const excluirReceitaLocal = async (index) => {
    const data = await AsyncStorage.getItem('receitasLocais');
    if (!data) return;
    const todasLocais = JSON.parse(data);
    const filtradas = todasLocais.filter(r => r.categoria === categoria);
    const globalIndex = todasLocais.findIndex(r => r === filtradas[index]);
    if (globalIndex < 0) return;
    todasLocais.splice(globalIndex, 1);
    await AsyncStorage.setItem('receitasLocais', JSON.stringify(todasLocais));
    carregarLocais(); // Atualiza a lista local imediatamente
  };

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" />;

  return (
    <View style={{flex:1, padding:16}}>
      <Button onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>Voltar</Button>

      <Text style={{fontSize:20, fontWeight:'bold'}}>Receitas da categoria: {categoria}</Text>

      <FlatList
        data={receitasApi}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{padding:12, backgroundColor:'#ddd', marginVertical:6, borderRadius:6}}
            onPress={() => navigation.navigate('ReceitasDetalhes', { idMeal: item.idMeal })}
          >
            <Text>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() =>
          receitasLocais.length > 0 ? (
            <>
              <Text style={{fontSize:18, marginTop:20}}>Receitas Locais</Text>
              {receitasLocais.map((item, i) => (
                <View key={i} style={{flexDirection:'row', alignItems:'center', marginVertical:4}}>
                  <TouchableOpacity
                    style={{flex:1, padding:10, backgroundColor:'#eee', borderRadius:6}}
                    onPress={() => navigation.navigate('ReceitasDetalhes', { receitaLocal: item })}
                  >
                    <Text>{item.nome}</Text>
                  </TouchableOpacity>
                  <Button onPress={() => excluirReceitaLocal(i)} compact textColor="red">Excluir</Button>
                </View>
              ))}
            </>
          ) : null
        }
      />

      <Button
        mode="contained"
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate('ReceitasCadastro', { categoria })}
      >
        Adicionar Receita Local
      </Button>
    </View>
  );
}
