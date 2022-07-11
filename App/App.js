import { View, } from 'react-native';
import NewLP from './Components/NewLP';
import styles from './Styles/style';
import { ThemeProvider } from '@rneui/themed';
import Theme from './Styles/Theme';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
    <View style={styles.container}>
      <NewLP></NewLP>
    </View>
    </ThemeProvider>
  );
}


