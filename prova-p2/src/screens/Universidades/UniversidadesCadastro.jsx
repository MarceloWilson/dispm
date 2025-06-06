import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UniversidadesCadastro({ navigation, route }) {
  const { universidade, index } = route.params || {};

  const [form, setForm] = useState({
    nome: universidade?.nome || '',
    pais: universidade?.pais || '',
    site: universidade?.site || '',
    estado: universidade?.estado || '',
    tipo: universidade?.tipo || ''
  });

  const salvar = async () => {
    if (!form.nome || !form.pais || !form.site || !form.estado || !form.tipo) {
      alert('Preencha todos os campos!');
      return;
    }
    const data = await AsyncStorage.getItem('universidades');
    const lista = data ? JSON.parse(data) : [];

    if (index >= 0) {
      lista[index] = form;
    } else {
      lista.push(form);
    }

    await AsyncStorage.setItem('universidades', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput label="Nome" value={form.nome} onChangeText={nome => setForm({ ...form, nome })} style={styles.input} />
      <TextInput label="País" value={form.pais} onChangeText={pais => setForm({ ...form, pais })} style={styles.input} />
      <TextInput label="Website" value={form.site} onChangeText={site => setForm({ ...form, site })} style={styles.input} />
      <TextInput label="Estado" value={form.estado} onChangeText={estado => setForm({ ...form, estado })} style={styles.input} />
      <TextInput label="Tipo" value={form.tipo} onChangeText={tipo => setForm({ ...form, tipo })} style={styles.input} />

      <Button mode="contained" onPress={salvar} style={{ marginBottom: 10 }}>
        Salvar
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        Voltar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});
