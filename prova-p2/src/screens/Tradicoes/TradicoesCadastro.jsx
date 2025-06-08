import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import {
  TextInput, Button, useTheme, Avatar
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TradicoesCadastro({ navigation, route }) {
  const { colors } = useTheme();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [dataTradicao, setDataTradicao] = useState('');
  const [foto, setFoto] = useState(null);
  const index = route.params?.index;

  useEffect(() => {
    const t = route.params?.tradicao;
    if (t) {
      setNome(t.nome || '');
      setDescricao(t.descricao || '');
      setLocal(t.local || '');
      setDataTradicao(t.dataTradicao || '');
      setFoto(t.foto || null);
    }
  }, [route.params]);

  const salvar = async () => {
    const nova = { nome, descricao, local, dataTradicao, foto };
    try {
      const dados = await AsyncStorage.getItem('tradicoes');
      const lista = dados ? JSON.parse(dados) : [];
      if (index !== undefined) lista[index] = nova;
      else lista.push(nova);
      await AsyncStorage.setItem('tradicoes', JSON.stringify(lista));
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Erro ao salvar a tradição.');
    }
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
            <Avatar.Image size={140} source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={140} icon="camera" style={[styles.avatar, { backgroundColor: colors.surfaceVariant }]} />
          )}

          <Button
            icon="image"
            mode="outlined"
            onPress={escolherFoto}
            style={styles.button}
          >
            {foto ? 'Alterar Foto' : 'Adicionar Foto'}
          </Button>

          <TextInput
            label="Nome da Tradição"
            mode="outlined"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />

          <TextInput
            label="Local"
            mode="outlined"
            value={local}
            onChangeText={setLocal}
            style={styles.input}
          />

          <TextInput
            label="Data"
            mode="outlined"
            value={dataTradicao}
            onChangeText={setDataTradicao}
            keyboardType="numeric"
            style={styles.input}
            render={(props) => (
              <TextInputMask {...props} type="datetime" options={{ format: 'DD/MM/YYYY' }} />
            )}
          />

          <Button
            icon="content-save"
            mode="contained"
            onPress={salvar}
            style={styles.button}
          >
            Salvar
          </Button>

          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => navigation.goBack()}
          >
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
  avatar: { marginBottom: 16, borderWidth: 2, borderColor: '#ccc' },
  input: { width: '100%', marginBottom: 16 },
  button: { width: '100%', marginVertical: 6 }
});
