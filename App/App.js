import {useState, useEffect} from 'react';
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
import EditBusiness from './Components/EditBusiness';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './Contexts/UserContext';
import {BusinessProvider} from './Contexts/BusinessContext';
import RewardScanner from './Components/RewardScanner';
import DrawerComponent from './Components/DrawerComponent';
import {DrawerButton} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

const Stack = createNativeStackNavigator();
const socket = io('https://gwi22-dramaticwire.herokuapp.com/api');

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

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
