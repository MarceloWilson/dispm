import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
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

export default function GastronomiaCadastro({ navigation, route }) {
  const { colors } = useTheme();

  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [dataReceita, setDataReceita] = useState('');
  const [foto, setFoto] = useState(null);

  const index = route.params?.index;

  useEffect(() => {
    if (route.params?.receita) {
      const receita = route.params.receita;
      setNome(receita.nome || '');
      setIngredientes(receita.ingredientes || '');
      setModoPreparo(receita.modoPreparo || '');
      setDataReceita(receita.dataReceita || '');
      setFoto(receita.foto || null);
    }
  }, [route.params]);

  const salvar = async () => {
    const novaReceita = {
      nome,
      ingredientes,
      modoPreparo,
      dataReceita,
      foto
    };

    try {
      const storage = await AsyncStorage.getItem('receitas');
      const lista = storage ? JSON.parse(storage) : [];

      if (index !== undefined) {
        lista[index] = novaReceita;
      } else {
        lista.push(novaReceita);
      }

      await AsyncStorage.setItem('receitas', JSON.stringify(lista));
      navigation.goBack();
    } catch (e) {
      alert('Erro ao salvar a receita');
    }
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada para acessar a galeria!');
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
              style={[
                styles.fotoPlaceholder,
                { backgroundColor: colors.surfaceVariant }
              ]}
            />
          )}

          <Button
            mode="contained-tonal"
            icon="camera"
            onPress={escolherFoto}
            style={styles.fotoButton}
            labelStyle={styles.buttonLabel}
          >
            {foto ? 'Alterar Foto do Prato' : 'Adicionar Foto do Prato'}
          </Button>

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Nome da Receita"
            placeholder="Digite o nome da receita"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Ingredientes"
            placeholder="Liste os ingredientes (separados por vírgula)"
            multiline
            numberOfLines={3}
            value={ingredientes}
            onChangeText={setIngredientes}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Modo de Preparo"
            placeholder="Descreva o passo a passo"
            multiline
            numberOfLines={4}
            value={modoPreparo}
            onChangeText={setModoPreparo}
          />

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Data da Receita"
            placeholder="DD/MM/AAAA"
            value={dataReceita}
            onChangeText={setDataReceita}
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
            Salvar Receita
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

import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 300
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
    backgroundColor: 'transparent'
  },
  fotoPlaceholder: {
    marginBottom: 16
  },
  fotoButton: {
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
