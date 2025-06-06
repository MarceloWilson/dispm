import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GatronomiaCadastro from '../screens/Gastronomia/GastronomiaCadastro';
import GastronomiaLista from '../screens/Gastronomia/GastronomiaList';
import GastronomiaReceita from '../screens/Gastronomia/GastronomiaReceita';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="GastronomiaLista" screenOptions={{ headerShown: false }}>

      <Stack.Screen name="GastronomiaLista" 
        component={GastronomiaLista} 
        options={{ title: "Lista de Gastronomia" }} />

      <Stack.Screen name="GastronomiaCadastro" 
        component={GatronomiaCadastro} 
        options={{ title: "Cadastro de Gastronomia" }} />

      <Stack.Screen name="GastronomiaReceita" 
        component={GastronomiaReceita} 
        options={{ title: "Receita de Gastronomia" }} />
    </Stack.Navigator>
  )
}

