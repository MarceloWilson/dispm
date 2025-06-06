import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UniversidadesLista from '../screens/Universidades/UniversidadesLista';
import UniversidadesCadastro from '../screens/Universidades/UniversidadesCadastro';
import UniversidadesDetalhe from '../screens/Universidades/UniversidadesDetalhes';

const Stack = createNativeStackNavigator();

export default function UniversidadesStack() {
  return (
    <Stack.Navigator 
      initialRouteName="UniversidadesLista" 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_bottom'
      }}
    >
      <Stack.Screen 
        name="UniversidadesLista" 
        component={UniversidadesLista} 
        options={{ title: "Lista de Universidades" }} 
      />
      <Stack.Screen 
        name="UniversidadesCadastro" 
        component={UniversidadesCadastro} 
        options={{ title: "Cadastro de Universidade" }} 
      />
      <Stack.Screen 
        name="UniversidadesDetalhe" 
        component={UniversidadesDetalhe} 
        options={{ title: "Detalhes da Universidade" }} 
      />
    </Stack.Navigator>
  );
}