import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GastronomiaCadastro = ({ navigation, route }) => {
  const { receita, index } = route.params || {};
  const [form, setForm] = useState({
    nome: '',
    pais: '',
    ingredientes: '',
    preparo: '',
    foto: ''
  });

  useEffect(() => {
    if (receita) setForm(receita);
  }, [receita]);

  const salvar = async () => {
    if (!form.nome || !form.pais || !form.ingredientes || !form.preparo || !form.foto) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    const data = await AsyncStorage.getItem('receitas');
    const lista = data ? JSON.parse(data) : [];
    if (index >= 0) {
      lista[index] = form;  // edição
    } else {
      lista.push(form);  // novo
    }
    await AsyncStorage.setItem('receitas', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput label="Nome" value={form.nome} onChangeText={nome => setForm({ ...form, nome })} style={{ marginBottom: 10 }} />
      <TextInput label="País de Origem" value={form.pais} onChangeText={pais => setForm({ ...form, pais })} style={{ marginBottom: 10 }} />
      <TextInput label="Ingredientes" value={form.ingredientes} onChangeText={ingredientes => setForm({ ...form, ingredientes })} multiline style={{ marginBottom: 10 }} />
      <TextInput label="Modo de Preparo" value={form.preparo} onChangeText={preparo => setForm({ ...form, preparo })} multiline style={{ marginBottom: 10 }} />
      <TextInput label="URL da Foto" value={form.foto} onChangeText={foto => setForm({ ...form, foto })} style={{ marginBottom: 10 }} />

      <Button mode="contained" onPress={salvar} style={{ marginBottom: 10 }}>Salvar</Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>Voltar</Button>
    </ScrollView>
  );
};

export default GastronomiaCadastro;
