import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceitasCadastro from '../screens/Receitas/ReceitasCadastro';
import ReceitasDetalhes from '../screens/Receitas/ReceitasDetalhes';
import ReceitasLista from '../screens/Receitas/ReceitasLista';
import ReceitasPorCategoria from '../screens/Receitas/ReceitasPorCategoria';

const Stack = createNativeStackNavigator();

export default function ReceitasStack() {
  return (
    <Stack.Navigator 
      initialRouteName="ReceitasLista"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="ReceitasLista" component={ReceitasLista} />
      <Stack.Screen name="ReceitasCadastro" component={ReceitasCadastro} />
      <Stack.Screen name="ReceitasDetalhes" component={ReceitasDetalhes} />
      <Stack.Screen name="ReceitasPorCategoria" component={ReceitasPorCategoria} />
    </Stack.Navigator>
  );
}
