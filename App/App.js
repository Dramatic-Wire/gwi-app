import { View, SafeAreaView } from 'react-native';
import NewLP from './Components/NewLP';
import styles from './Styles/style';
import { NativeBaseProvider, Text, Box, Container } from 'native-base';
import Theme from './Styles/Theme';
import RegisterBusiness from './Components/RegisterBusiness';
import NewUser from './Components/NewUser';
import BusinessProfile from './Components/BusinessProfile';
import UserProfile from './Components/UserProfile';
import LoginScreen from './Components/LoginScreen';
import BarcodeScanner from './Components/BarcodeScanner';


export default function App() {
  return (
    
    <NativeBaseProvider theme={Theme}>
      <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}>
        <Box style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}  >
      {/* <NewLP></NewLP> */}
      {/* <NewUser></NewUser> */}
    <RegisterBusiness></RegisterBusiness>
      {/* <UserProfile></UserProfile> */}
        </Box>
    </Box>
    </NativeBaseProvider>

    
  );
}


