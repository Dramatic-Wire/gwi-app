import {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import NewLP from './Components/NewLP';
import {NativeBaseProvider, Text, Box, Container} from 'native-base';
import Theme from './Styles/Theme';
import RegisterBusiness from './Components/RegisterBusiness';
import NewUser from './Components/NewUser';
import BusinessProfile from './Components/BusinessProfile';
import UserProfile from './Components/UserProfile';
import LoginScreen from './Components/LoginScreen';
import BarcodeScanner from './Components/BarcodeScanner';
import EditLP from './Components/EditLP';
import Success from './Components/Success';
import Error from './Components/Error';
import EditBusiness from './Components/EditBusiness';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './Contexts/UserContext';
import {BusinessProvider} from './Contexts/BusinessContext';
import RewardScanner from './Components/RewardScanner';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <BusinessProvider>
        <NativeBaseProvider theme={Theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='LoginScreen'
              screenOptions={{headerShown: false}}
            >
              <Stack.Screen
                name='BusinessProfile'
                component={BusinessProfile}
              />
              <Stack.Screen name='UserProfile' component={UserProfile} />
              <Stack.Screen name='NewLP' component={NewLP} />
              <Stack.Screen name='NewUser' component={NewUser} />
              <Stack.Screen
                name='RegisterBusiness'
                component={RegisterBusiness}
              />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='BarcodeScanner' component={BarcodeScanner} />
              <Stack.Screen name='EditLP' component={EditLP} />
              <Stack.Screen name='Success' component={Success} />
              <Stack.Screen name='Error' component={Error} />
              <Stack.Screen name='EditBusiness' component={EditBusiness} />
              <Stack.Screen name='RewardScanner' component={RewardScanner} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </BusinessProvider>
    </UserProvider>
  );
}
//<Stack.Navigator initialRouteName="RegisterBusiness" screenOptions={{ headerShown: false }} >
