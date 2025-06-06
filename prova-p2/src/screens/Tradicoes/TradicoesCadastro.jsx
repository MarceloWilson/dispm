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
  Avatar,
  Text
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
    if (route.params?.tradicao) {
      const tradicao = route.params.tradicao;
      setNome(tradicao.nome || '');
      setDescricao(tradicao.descricao || '');
      setLocal(tradicao.local || '');
      setDataTradicao(tradicao.dataTradicao || '');
      setFoto(tradicao.foto || null);
    }
  }, [route.params]);

  const salvar = async () => {
    const novaTradicao = {
      nome,
      descricao,
      local,
      dataTradicao,
      foto
    };

    try {
      const storage = await AsyncStorage.getItem('tradicoes');
      const lista = storage ? JSON.parse(storage) : [];

      if (index !== undefined) {
        lista[index] = novaTradicao;
      } else {
        lista.push(novaTradicao);
      }

      await AsyncStorage.setItem('tradicoes', JSON.stringify(lista));
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao salvar a tradição:', e);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a tradição.');
    }
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const removerFoto = () => {
    setFoto(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {foto ? (
            <Avatar.Image
              size={150}
              source={{ uri: foto }}
              style={styles.fotoPreview}
            />
          ) : (
            <Avatar.Icon
              size={150}
              icon="camera"
              style={[styles.fotoPlaceholder, { backgroundColor: colors.surfaceVariant }]}
            />
          )}

          <Button
            mode="contained-tonal"
            icon="camera"
            onPress={escolherFoto}
            style={styles.fotoButton}
            labelStyle={styles.buttonLabel}
          >
            {foto ? 'Alterar Foto da Tradição' : 'Adicionar Foto da Tradição'}
          </Button>

          {foto && (
            <Button
              mode="outlined"
              onPress={removerFoto}
              style={styles.removeFotoButton}
              textColor={colors.error}
            >
              Remover Foto
            </Button>
          )}

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Nome da Tradição"
            placeholder="Informe o nome da tradição"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Descrição"
            placeholder="Descreva a tradição"
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Local"
            placeholder="Informe o local da tradição"
            value={local}
            onChangeText={setLocal}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Data da Tradição"
            placeholder="DD/MM/AAAA"
            value={dataTradicao}
            onChangeText={setDataTradicao}
            keyboardType="numeric"
            render={(props) => (
              <TextInputMask
                {...props}
                type={'datetime'}
                options={{ format: 'DD/MM/YYYY' }}
              />
            )}
          />

          <Button
            mode="contained"
            onPress={salvar}
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            labelStyle={styles.buttonLabel}
            icon="content-save"
          >
            Salvar Tradição
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 8 }}
            icon="arrow-left"
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30
  },
  formContainer: {
    alignItems: 'center',
    paddingBottom: 30
  },
  input: {
    width: '100%',
    marginBottom: 16
  },
  fotoPreview: {
    marginBottom: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ddd'
  },
  fotoPlaceholder: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  fotoButton: {
    width: '100%',
    marginBottom: 10
  },
  removeFotoButton: {
    width: '100%',
    marginBottom: 24
  },
  saveButton: {
    width: '100%',
    marginTop: 16,
    paddingVertical: 8
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 6
  }
});
