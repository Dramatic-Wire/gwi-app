import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView, Switch } from 'react-native';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton, AlertDialog, Divider, Spacer, View } from "native-base";
import { useContext, useState, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import BusinessContext from '../Contexts/BusinessContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'



export default function DrawerComponent() {


    let isEnabled = false
    const route = useRoute();
    const { first_name, surname, setUserId, setFirst_name, setSurname, setLP } = useContext(UserContext);
    const { businessID, LP_id } = useContext(BusinessContext);
    const [openAlert, setOpenAlert] = useState(false);
    const { colors } = useTheme()
    const [deleteBusinessOpen, setDeleteBusiness] = useState(false);
    const navigation = useNavigation();

    const handleLogout = () => {
        setUserId();
        setFirst_name();
        setSurname();
        setLP();
        navigation.navigate('LoginScreen')
    }
    const DeleteBusiness = async () => {

        await axios.delete(`delete/business?ownerID=${ownerID}`).then(res => {
            setBusinessID();
            navigation.navigate('UserProfile')
        }).catch(error => console.log(error));
    }
    const onCloseBusiness = () => {
        setDeleteBusiness(false)

    }


    const deleteAccount = async () => {
        await axios.delete(`/api/deleteAccount?id=${userId}`).then(res => {
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
            <View bgColor='white'>
                <HStack width='100%' pt='5' pb='2' paddingX='2' alignItems={'center'}>
                    <IconButton icon={<Icon name='angle-left' size={30} color={'blue.900'} />} onPress={() => navigation.goBack()} />
                    <Icon name='user-circle' size={25} color={colors['primary'][500]} style={{ marginTop: 13, marginRight: 5 }} />

                    <Heading marginTop={2.5} textAlign='left'>{first_name} {surname}</Heading>
                </HStack>
            </View>
            <Box >

            </Box>
            <VStack space={3} safeArea='8' >
                <Text fontSize="lg">Business Settings</Text>
                {businessID > 0 ? <Button onPress={() => navigation.navigate('EditBusiness')}>Edit business</Button> : <Button onPress={() => { navigation.navigate('RegisterBusiness'); onClose(true) }}>Add a business</Button>}
                {businessID > 0 && <Button colorScheme="danger" onPress={() => setDeleteBusiness(!deleteBusinessOpen)}>Delete business</Button>}
                <Text fontSize="lg">Account Settings</Text>
                <Button colorScheme="danger" onPress={() => setOpenAlert(true)}>Delete Account</Button>
            </VStack>

            {/* Delete business alert */}
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={deleteBusinessOpen} onClose={onCloseBusiness}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Business</AlertDialog.Header>
                    <AlertDialog.Body>
                        This will remove all data relating to your business. This action cannot be
                        reversed. Deleted data can not be recovered.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onCloseBusiness} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={DeleteBusiness}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

            {/* Delete account alert */}
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
            <Button style={{ position: 'absolute', bottom: 10, width: '95%' }} onPress={handleLogout}>Logout</Button>
        </>
    )
} 