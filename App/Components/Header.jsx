import { ScrollView, Switch } from 'react-native';
import { useContext, useState, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton, AlertDialog, Divider, Spacer } from "native-base";
import BusinessContext from '../Contexts/BusinessContext';
import Icon from 'react-native-vector-icons/FontAwesome'
import Logo from './Icons/Logo';
import AxiosInstance from '../Hooks/AxiosInstance';

import { useRoute, useNavigation } from '@react-navigation/native';



export default function Header() {
  const route = useRoute();
  const navigation = useNavigation();

  const axios = AxiosInstance();
  const { colors } = useTheme()

  let isEnabled = false
  const [viewSettings, setViewSettings] = useState(false);


  const [openAlert, setOpenAlert] = useState(false);
  const { businessID, LP_id } = useContext(BusinessContext);
  const { setUserId, setSurname, setFirst_name, setProfile_picture, userId, first_name } = useContext(UserContext);

  route.name == 'UserProfile' ? isEnabled = false : isEnabled = true
  const handleLogout = () => {
    setUserId();
    setFirst_name();
    setSurname();
    navigation.navigate('LoginScreen')
  }
  const toggleProfiles = () => {
    if (route.name == 'UserProfile') { navigation.navigate('BusinessProfile') } else { navigation.navigate('UserProfile') }
    onClose(true)
  }

  const deleteAccount = async () => {
    await axios.delete(`/deleteAccount?id=${userId}`).then(res => {
      navigation.navigate('LoginScreen')
    })
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const closeAlert = () => setOpenAlert(false);
  const cancelRef = useRef(null);
  return (
    <>
      <HStack bgColor='primary.700' width='100%' pt='10' pb='2' paddingX='5' justifyContent={'space-between'} alignItems={'center'}>
        <Box height={50} width='35%'>
          <Logo fill={colors['secondary'][500]} />
        </Box>
        <VStack>

          <IconButton height={50} icon={<Icon name='user-circle' size={30} color={colors['primary'][500]} />} onPress={() => { navigation.navigate('DrawerComponent') }} />
          {/* {businessID > 0 && route.name == 'UserProfile' ? <Text>Switch to Business Profile</Text> : <Text>Switch to User Profile</Text>} */}

          {businessID > 0 &&
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              
              onValueChange={toggleProfiles}
              value={isEnabled}
            />
          }
        </VStack>
      </HStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content onClose={onClose}>
          <Heading>Hi {first_name}</Heading>




          <Divider style={{ marginBottom: 9 }} />
          {businessID == undefined && <Button onPress={() => { navigation.navigate('RegisterBusiness'); onClose(true) }} >Add a business</Button>}
          <Button colorScheme="danger" onPress={() => setOpenAlert(true)}>
            Delete Account
          </Button>

          <Button onPress={handleLogout}>Logout</Button>
        </Actionsheet.Content >

      </Actionsheet >

      {/* <Actionsheet value={viewSettings} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content isOpen={isOpen} onClose={onClose}>
      <IconButton height={50} icon={<Icon name='gear' size={30} color={colors['black'][500]} />} onPress={() => { setViewSettings(true); onClose(true) }} />
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