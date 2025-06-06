import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TradicoesCadastro = ({ navigation, route }) => {
  const { tradicao, index } = route.params || {};
  const [form, setForm] = useState({
    nome: '',
    pais: '',
    descricao: '',
    data: '',
    vestimenta: ''
  });

  useEffect(() => {
    if (tradicao) setForm(tradicao);
  }, [tradicao]);

  const salvar = async () => {
    if (!form.nome || !form.pais || !form.descricao || !form.data || !form.vestimenta) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    const data = await AsyncStorage.getItem('tradicoes');
    const lista = data ? JSON.parse(data) : [];
    if (index >= 0) {
      lista[index] = form;
    } else {
      lista.push(form);
    }
    await AsyncStorage.setItem('tradicoes', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput label="Nome" value={form.nome} onChangeText={nome => setForm({ ...form, nome })} style={{ marginBottom: 10 }} />
      <TextInput label="País" value={form.pais} onChangeText={pais => setForm({ ...form, pais })} style={{ marginBottom: 10 }} />
      <TextInput label="Descrição" value={form.descricao} onChangeText={descricao => setForm({ ...form, descricao })} multiline style={{ marginBottom: 10 }} />
      <TextInput label="Data" value={form.data} onChangeText={data => setForm({ ...form, data })} style={{ marginBottom: 10 }} />
      <TextInput label="Vestimenta Típica" value={form.vestimenta} onChangeText={vestimenta => setForm({ ...form, vestimenta })} style={{ marginBottom: 10 }} />

      <Button mode="contained" onPress={salvar} style={{ marginBottom: 10 }}>Salvar</Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>Voltar</Button>
    </ScrollView>
  );
};

export default TradicoesCadastro;
