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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenTitle from './Components/ScreenTitle';
import { UserProvider } from './Contexts/UserContext';
import { BusinessProvider } from './Contexts/BusinessContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    //     <Box style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}  >
    //   {/* <NewLP></NewLP> */}
    //   {/* <NewUser></NewUser> */}
    // {/* <RegisterBusiness></RegisterBusiness> */}
    //       {/* <UserProfile></UserProfile> */}
    //       <BusinessProfile></BusinessProfile>
    // </Box>
    <UserProvider>
    <BusinessProvider>
    <NativeBaseProvider theme={Theme}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterBusiness" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="BusinessProfile" component={BusinessProfile}  />
        <Stack.Screen name="NewLP" component={NewLP} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="RegisterBusiness" component={RegisterBusiness} />
      </Stack.Navigator>
    </NavigationContainer>
      </NativeBaseProvider>
    </BusinessProvider>
    </UserProvider>
  );
}


