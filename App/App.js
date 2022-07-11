import { StyleSheet, Text, View, } from 'react-native';
import NewLP from './Components/NewLP';


export default function App() {
  return (
    <View style={styles.container}>
      <NewLP></NewLP>
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
