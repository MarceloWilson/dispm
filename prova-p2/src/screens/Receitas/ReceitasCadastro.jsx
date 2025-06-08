import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReceitasCadastro({ route, navigation }) {
  const { receitaLocal, index, categoria } = route.params || {};
  const [form, setForm] = useState({
    nome: receitaLocal?.nome || '',
    categoria: receitaLocal?.categoria || categoria || '',
    modoPreparo: receitaLocal?.modoPreparo || '',
  });

  useEffect(() => {
    if (categoria && !form.categoria) setForm(f => ({ ...f, categoria }));
  }, []);

  const salvar = async () => {
    if (!form.nome || !form.categoria || !form.modoPreparo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const data = await AsyncStorage.getItem('receitasLocais');
    const lista = data ? JSON.parse(data) : [];

    if (index >= 0) lista[index] = form;
    else lista.push(form);

    await AsyncStorage.setItem('receitasLocais', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <ScrollView style={{padding:10}}>
      <Button onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>Voltar</Button>

      <TextInput
        label="Nome"
        value={form.nome}
        onChangeText={nome => setForm({ ...form, nome })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Categoria"
        value={form.categoria}
        onChangeText={categoria => setForm({ ...form, categoria })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Modo de Preparo"
        value={form.modoPreparo}
        onChangeText={modoPreparo => setForm({ ...form, modoPreparo })}
        multiline
        numberOfLines={5}
        style={{ marginBottom: 10 }}
      />

      <Button mode="contained" onPress={salvar} style={{ marginBottom: 10 }}>
        Salvar
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        Cancelar
      </Button>
    </ScrollView>
  );
}
