import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './LoginScreen';
import NewUser from './NewUser';

const Drawer = createDrawerNavigator();



export default function DrawerComponent(){

    return (
    
        <Drawer.Navigator bgColor='white'>
            <Drawer.Screen name="Profile" component={NewUser} />
            <Drawer.Screen name="Logout" component={LoginScreen} />
        </Drawer.Navigator>
    )
} 