import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function ReceitasDetalhes({ route, navigation }) {
  const { idMeal, receitaLocal } = route.params;
  const [receita, setReceita] = useState(receitaLocal || null);
  const [loading, setLoading] = useState(!receitaLocal);

  useEffect(() => {
    if (!receitaLocal && idMeal) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(res => res.json())
        .then(json => setReceita(json.meals[0]))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" />;

  if (!receita) return <Text style={{padding:16}}>Receita não encontrada.</Text>;

  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ing = receita[`strIngredient${i}`];
    const med = receita[`strMeasure${i}`];
    if (ing && ing.trim() !== '') ingredientes.push(`${med || ''} ${ing}`.trim());
  }

  return (
    <ScrollView style={{flex:1, padding:16}}>
      <Button onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>Voltar</Button>

      <Text style={{fontSize:24, fontWeight:'bold', marginBottom:8}}>{receita.strMeal || receita.nome}</Text>

      {receita.strMealThumb && (
        <Image source={{ uri: receita.strMealThumb }} style={{ width:'100%', height:200, borderRadius:8, marginBottom:12 }} />
      )}

      <Text style={{fontWeight:'bold', marginBottom:4}}>Ingredientes:</Text>
      {ingredientes.map((i, idx) => (
        <Text key={idx}>{i}</Text>
      ))}

      <Text style={{fontWeight:'bold', marginTop:12, marginBottom:4}}>Instruções:</Text>
      <Text>{receita.strInstructions || receita.modoPreparo || 'Sem instruções.'}</Text>
    </ScrollView>
  );
}
