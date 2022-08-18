import { createDrawerNavigator } from '@react-navigation/drawer';
import BusinessProfile from './BusinessProfile';
import LoginScreen from './LoginScreen';

const Drawer = createDrawerNavigator();



export default function DrawerComponent(){

    return (
    
        <Drawer.Navigator bgColor='white'>
            <Drawer.Screen name="Profile" component={BusinessProfile} />
            <Drawer.Screen name="Logout" component={LoginScreen} />
        </Drawer.Navigator>
    )
} 