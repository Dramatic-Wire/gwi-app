import { View, SafeAreaView } from 'react-native';
import NewLP from './Components/NewLP';
import styles from './Styles/style';
import { NativeBaseProvider, Text, Box, Container } from 'native-base';
import Theme from './Styles/Theme';

export default function App() {
  return (
    
    <NativeBaseProvider theme={Theme}>
    <SafeAreaView style={styles.container}>
      <NewLP></NewLP>
    </SafeAreaView>
    </NativeBaseProvider>
  );
}


