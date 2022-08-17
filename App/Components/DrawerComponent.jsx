import { createDrawerNavigator } from '@react-navigation/drawer';
import BusinessProfile from './BusinessProfile';
import LoginScreen from './LoginScreen';

const Drawer = createDrawerNavigator();



export default function DrawerComponent(){

    return (
    
        <Drawer.Navigator bgColor='white'>
            <Drawer.Screen name="Home" component={LoginScreen} />
            <Drawer.Screen name="Profile" component={BusinessProfile} />
        </Drawer.Navigator>
    )
} 