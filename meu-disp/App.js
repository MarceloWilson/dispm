import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import primeiroComponente from './componentes/primeiroComponente';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Agora esta conectado no meu computador!</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
