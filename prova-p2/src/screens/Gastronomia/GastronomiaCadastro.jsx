import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import {
  TextInput,
  Button,
  useTheme,
  Avatar
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GastronomiaCadastro({ navigation, route }) {
  const { colors } = useTheme();
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [foto, setFoto] = useState(null);
  const index = route.params?.index;

  useEffect(() => {
    const r = route.params?.receita;
    if (r) {
      setNome(r.nome || '');
      setLocal(r.local || '');
      setDataCriacao(r.dataCriacao || '');
      setFoto(r.foto || null);
    }
  }, [route.params]);

  const salvar = async () => {
    const nova = { nome, local, dataCriacao, foto };
    try {
      const dados = await AsyncStorage.getItem('receitas');
      const lista = dados ? JSON.parse(dados) : [];
      if (index !== undefined) lista[index] = nova;
      else lista.push(nova);
      await AsyncStorage.setItem('receitas', JSON.stringify(lista));
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Acesso à galeria é necessário.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          {foto ? (
            <Avatar.Image size={120} source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={120} icon="camera" style={styles.avatar} />
          )}

          <Button mode="outlined" icon="image" onPress={escolherFoto} style={styles.button}>
            {foto ? 'Alterar Foto' : 'Adicionar Foto'}
          </Button>

          <TextInput
            label="Nome do Prato"
            mode="outlined"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />

          <TextInput
            label="Local da Gastronomia"
            mode="outlined"
            value={local}
            onChangeText={setLocal}
            style={styles.input}
          />

          <TextInput
            label="Data de Criação"
            mode="outlined"
            placeholder="DD/MM/AAAA"
            value={dataCriacao}
            onChangeText={setDataCriacao}
            keyboardType="numeric"
            style={styles.input}
            render={(props) => (
              <TextInputMask {...props} type="datetime" options={{ format: 'DD/MM/YYYY' }} />
            )}
          />

          <Button mode="contained" icon="content-save" onPress={salvar} style={styles.button}>
            Salvar
          </Button>

          <Button mode="text" icon="arrow-left" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 16 },
  contentContainer: { flexGrow: 1, paddingBottom: 30 },
  form: { alignItems: 'center' },
  avatar: { marginBottom: 16, backgroundColor: '#ddd' },
  input: { width: '100%', marginBottom: 16 },
  button: { width: '100%', marginVertical: 6 }
});
