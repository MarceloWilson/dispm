import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import StackRoutes from './src/routes/StackRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackRoutes />
      </PaperProvider>
    </NavigationContainer>
  );
}
