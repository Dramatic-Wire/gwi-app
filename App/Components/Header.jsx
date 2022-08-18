import { ScrollView, Switch } from 'react-native';
import { useContext, useState, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton, AlertDialog, Divider, Spacer } from "native-base";
import BusinessContext from '../Contexts/BusinessContext';
import Icon from 'react-native-vector-icons/FontAwesome'
import Logo from './Icons/Logo';
import AxiosInstance from '../Hooks/AxiosInstance';
import DrawerComponent from './DrawerComponent';
import { useRoute } from '@react-navigation/native';

export default function Header({ navigation }) {
  const route = useRoute();

  const axios = AxiosInstance();
  const { colors } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false);
  const [viewSettings, setViewSettings] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [openAlert, setOpenAlert] = useState(false);
  const { businessID, } = useContext(BusinessContext);
  const { setUserId, setSurname, setFirst_name, setProfile_picture, userId, first_name } = useContext(UserContext);

  const handleLogout = () => {
    setUserId();
    setFirst_name();
    setSurname();
    navigation.navigate('LoginScreen')
  }
  const toggleProfiles = () => {
    toggleSwitch
    navigation.navigate('BusinessProfile')
    onClose(true)
    console.log(route.name);

  }
  const toggleProfiles2 = () => {
    toggleSwitch
    navigation.navigate('UserProfile')
    onClose(true)

  }
  console.log(route.name);

  const deleteAccount = async () => {
    await axios.delete(`/deleteAccount?id=${userId}`).then(res => {
      navigation.navigate('LoginScreen')
    })
  }

  const {
    isOpen,
    onOpen,
    onClose,
    onToggle
  } = useDisclose();

  const closeAlert = () => setOpenAlert(false);
  const cancelRef = useRef(null);
  return (
    <>
      {/* <DrawerComponent></DrawerComponent> */}
      <HStack bgColor='primary.700' width='100%' pt='10' pb='2' paddingX='5' justifyContent={'space-between'} alignItems={'middle'}>
        <Box height={50} width='35%'>
          <Logo fill={colors['secondary'][500]} />
        </Box>
        <IconButton height={50} icon={<Icon name='user-circle' size={30} color={colors['primary'][500]} />} onPress={onOpen} />
      </HStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content onClose={onClose}>
          <Heading>Hi {first_name}</Heading>

          {route.name == 'UserProfile' && <Text>User Profile</Text>}
          {route.name == 'BusinessProfile' && <Text>Business Profile</Text>}

          {route.name == 'UserProfile' &&
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleProfiles }
              value={isEnabled}

            />}
          {route.name == 'BusinessProfile' && <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleProfiles2}
            value={isEnabled} />
          }


          <Divider style={{ marginBottom: 9 }} />
          {businessID == undefined && <Button onPress={() => { navigation.navigate('RegisterBusiness'); onClose(true) }} >Add a business</Button>}

          <IconButton height={50} icon={<Icon name='gear' size={30} color={colors['black'][500]} />} onPress={() => { setViewSettings(true); onClose(true) }} />

          <Button onPress={handleLogout}>Logout</Button>
        </Actionsheet.Content >

      </Actionsheet >

      {/* <Actionsheet value={viewSettings} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content isOpen={isOpen} onClose={onClose}>
        <Button colorScheme="danger" onPress={() => setOpenAlert(true)}>
          Delete Account
        </Button>
      </Actionsheet.Content >
      </Actionsheet> */}

      {/* Alert dialogue to confirm account delete */}
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={openAlert} onClose={closeAlert}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Account</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to your account. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={closeAlert} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={deleteAccount}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  )
}