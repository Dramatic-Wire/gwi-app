import {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import NewLP from './Components/NewLP';
import {NativeBaseProvider, Text, Box, Container, Drawer} from 'native-base';
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
import RewardSuccess from './Components/RewardSuccess';
import RewardError from './Components/RewardError';
import EditBusiness from './Components/EditBusiness';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './Contexts/UserContext';
import {BusinessProvider} from './Contexts/BusinessContext';
import RewardScanner from './Components/RewardScanner';
import DrawerComponent from './Components/DrawerComponent';
import {DrawerButton} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                name='DrawerComponent'
                component={DrawerComponent}
              />
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
              <Stack.Screen name='RewardSuccess' component={RewardSuccess} />
              <Stack.Screen name='Error' component={Error} />
              <Stack.Screen name='RewardError' component={RewardError} />
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
