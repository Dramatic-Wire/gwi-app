import { ScrollView, Switch } from 'react-native';
import { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton } from "native-base";
import styles from '../Styles/style';
import CardIcon from './CardIcon';
import Loading from './Loading';
import StampIcon from './Icons/StampIcon';
import LoyaltyCard from './LoyaltyCard';
import RewardCode from './RewardCode';
import BusinessContext from '../Contexts/BusinessContext';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useFonts } from 'expo-font';

export default function Header({ navigation }) {
  const { colors } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [focusLP, setFocusLP] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const { businessName, loyaltyProgramme, businessID, setBusinessID } = useContext(BusinessContext);
  const { first_name, LP, userId, setUserId, setUsername, setSurname, setFirst_name, setProfile_picture } = useContext(UserContext);

  const handleLogout = () => {
    setUserId();
    setUsername();
    setFirst_name();
    setSurname();
    setProfile_picture();
    navigation.navigate('LoginScreen')
  }
  const toggleProfiles = () => {
    toggleSwitch
    navigation.navigate('BusinessProfile')
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  if (!first_name || !LP) return (<Loading></Loading>);

  return (
    <>
    <Box bgColor='secondary.500' width='100%' pt='10' pb='2' justifyItems={'end'}>
      <Heading p='2' fontFamily='AndersonGrotesk'>stampede</Heading>
      <IconButton icon={<Icon name='user-circle' size={30} color={colors['primary'][600]} /> } onPress={onOpen} />
      </Box>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content onClose={onClose}>
          <Button onPress={() => { navigation.navigate('RegisterBusiness') }} >Add a business</Button>
          <Button onPress={() => { navigation.navigate('LoginScreen') }} >Delete account</Button>

          {businessID > 0 &&
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleProfiles}
              value={isEnabled} />
          }
        </Actionsheet.Content>
      </Actionsheet>
      </>
    // <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

      // <Actionsheet isOpen={isOpen} onClose={onClose}>
      //   <Actionsheet.Content onClose={onClose}>
      //     <Button onPress={() => { navigation.navigate('RegisterBusiness') }} >Add a business</Button>

      //     {businessID > 0 &&
      //       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
      //         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      //         ios_backgroundColor="#3e3e3e"
      //         onValueChange={toggleProfiles}
      //         value={isEnabled} />
      //     }
      //   </Actionsheet.Content>
      // </Actionsheet>

    //   <Box width='100%'>

    //     <HStack bgColor={'primary.700'} width='100%' alignItems={'center'} padding={5} marginBottom={-50} paddingBottom={60} borderColor='primary.200' borderTopWidth={4} justifyContent={'space-between'}>
    //       <IconButton icon={<Icon name='user-circle' size={30} /> } onPress={onOpen} />
    //       <Pressable justifySelf='flex-start' rounded={'full'} bgColor='primary.800' p={4} onPress={() => { navigation.navigate('BarcodeScanner') }} width='90' height='90' marginTop={-45} borderColor='primary.200' borderWidth={4}>
    //         <StampIcon justifySelf='center' />
    //       </Pressable>
    //       <Button onPress={handleLogout}>Logout</Button>

    //     </HStack>
    //   </Box>

    // </Box>

  )
}