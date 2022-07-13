import { View, SafeAreaView } from 'react-native';
import NewLP from './Components/NewLP';
import styles from './Styles/style';
import { NativeBaseProvider, Text, Box, Container } from 'native-base';
import Theme from './Styles/Theme';
import RegisterBusiness from './Components/RegisterBusiness';
import NewUser from './Components/NewUser';
import BusinessProfile from './Components/BusinessProfile';
import UserProfile from './Components/UserProfile';

export default function App() {
  return (
    
    <NativeBaseProvider theme={Theme}>
    <SafeAreaView style={styles.container}>
      <NewLP></NewLP>
      {/* <NewBusiness></NewBusiness> */}
      {/* <NewUser></NewUser> */}
      {/* <RegisterBusiness></RegisterBusiness> */}
      {/* <UserProfile></UserProfile> */}
    </SafeAreaView>
    </NativeBaseProvider>
  );
}


