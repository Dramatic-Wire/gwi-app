import { Button, Text, Heading, Box, HStack, VStack, useTheme, AlertDialog } from "native-base";
import { useContext, useState, useRef } from 'react';
import BusinessContext from '../Contexts/BusinessContext';
import UserContext from "../Contexts/UserContext";
import styles from '../Styles/style';
import QRCode from 'react-native-qrcode-svg';
import axios from "axios";
import { ScrollView, Switch } from 'react-native';
import Loading from "./Loading";

// import RemoveLP from "./DeleteLP";

export default function BusinessProfile({ navigation }) {
    const { businessName, loyaltyProgramme, businessID, setLoyaltyProgramme, members, setMembers, setLP_id, setBusinessID } = useContext(BusinessContext);
    const { colors } = useTheme();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const [preview, setPreview] = useState(false)
    const { userId } = useContext(UserContext)
    const ownerID = userId

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);


    const toggleProfiles = () => {
        toggleSwitch
        navigation.navigate('UserProfile')
    }

    const DeleteLP = () => {
        axios
            .delete(`https://gwi22-dramaticwire.herokuapp.com/api/delete/LP?businessID=${businessID}`)
            .then((result => {
                const results = result.data
                setLP_id();
                console.log('deleted');
                // navigation.navigate('NewLP')

            })).catch(error => console.log(error));
    }

    const DeleteBusiness = () => {
        axios
            .delete(`https://gwi22-dramaticwire.herokuapp.com/api/delete/business?ownerID=${ownerID}`)
            .then((result => {
                setBusinessID();
                navigation.navigate('UserProfile')
                console.log('business deleted');

            })).catch(error => console.log(error));
    }
      

    if (!loyaltyProgramme) return (
        <Loading></Loading>
    );

    // console.log(loyaltyProgramme)
    // console.log(members);

    return (
        <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <VStack space={3} safeArea='8' >
                <Box variant='pageTitle'>
                    <Heading style={styles.pageTitle}>{businessName}</Heading>
                    <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleProfiles}
                        value={isEnabled} />
                </Box>

                {loyaltyProgramme == 'none' && members == undefined && <Box variant='section'>
                    <Text variant='section'>You currently have no loyalty programme for your business</Text>
                    <Button onPress={() => { navigation.navigate('NewLP') }}>Add Loyalty Programme</Button>
                </Box>}

                {loyaltyProgramme !== 'none' && <Box variant='section' style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <QRCode
                        color={colors.primary['700']}
                        backgroundColor={colors.light['50']}
                        value={loyaltyProgramme.lp_id}
                    />
                    <Text variant='section'>{'Scan to stamp customer loyalty card'}</Text>
                    {members == undefined && <Text>{`${0} active members on programme`}</Text>}
                    {members !== undefined && <Text>{`${members} active members on programme`}</Text>}
                    {loyaltyProgramme.stamps !== undefined && <Text>{`${loyaltyProgramme.stamps} stamps for ${loyaltyProgramme.reward}`}</Text>}
                    {loyaltyProgramme.stamps == undefined && <Text>{`${loyaltyProgramme.stampsRequired} stamps for ${loyaltyProgramme.reward}`}</Text>}
                    <HStack space={3} justifyContent="center" >
                        <Button onPress={() => navigation.navigate('EditLP')}>Edit LP</Button>
                        {/* <Button onPress={DeleteLP}>Delete</Button> */}
                            <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
                                Delete LP
                            </Button>
                            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton />
                                    <AlertDialog.Header>Delete Loyalty Programme</AlertDialog.Header>
                                    <AlertDialog.Body>
                                        This will remove all data relating to the business’ Loyalty Programme. This action cannot be
                                        reversed. Deleted data can not be recovered.
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="danger" onPress={() => {onClose; DeleteLP}}>
                                                Delete
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                    </HStack>
                </Box>}
                <HStack space={3} justifyContent="center" >
                    <Button onPress={() => navigation.navigate('EditBusiness')}>Edit Business</Button>
                    {/* <Button onPress={DeleteBusiness}>Delete Business</Button> */}
                    <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
                                Delete Business
                            </Button>
                            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton />
                                    <AlertDialog.Header>Delete Business</AlertDialog.Header>
                                    <AlertDialog.Body>
                                        This will remove all data relating to the business. This action cannot be
                                        reversed. Deleted data can not be recovered.
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="danger" onPress={() => {onClose; DeleteBusiness}}>
                                                Delete
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                </HStack>

            </VStack>
        </Box>
    );
}