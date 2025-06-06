import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TradicoesLista from '../screens/Tradicoes/TradicoesLista';
import TradicoesCadastro from '../screens/Tradicoes/TradicoesCadastro';
import TradicoesDetalhe from '../screens/Tradicoes/TradicoesDetalhes';

const Stack = createNativeStackNavigator();

export default function TradicoesStack() {
  return (
    <Stack.Navigator 
      initialRouteName="TradicoesLista" 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right' 
      }}
    >
      <Stack.Screen 
        name="TradicoesLista" 
        component={TradicoesLista} 
        options={{ title: "Lista de Tradições" }} 
      />
      <Stack.Screen 
        name="TradicoesCadastro" 
        component={TradicoesCadastro} 
        options={{ title: "Cadastro de Tradição" }} 
      />
      <Stack.Screen 
        name="TradicoesDetalhe" 
        component={TradicoesDetalhe} 
        options={{ title: "Detalhes da Tradição" }} 
      />
    </Stack.Navigator>
  );
}