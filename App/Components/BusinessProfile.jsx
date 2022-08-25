import { Button, Text, Heading, Box, HStack, VStack, useTheme, AlertDialog } from "native-base";
import { useContext, useState, useRef, useEffect } from 'react';
import BusinessContext from '../Contexts/BusinessContext';
import UserContext from "../Contexts/UserContext";
import styles from '../Styles/style';
import QRCode from 'react-native-qrcode-svg';
import { ScrollView, Switch } from 'react-native';
import Loading from "./Loading";
import AxiosInstance from "../Hooks/AxiosInstance";
import Header from './Header';


export default function BusinessProfile({ navigation }) {

    const { businessName, loyaltyProgramme, businessID, setLoyaltyProgramme, members, setMembers, setLP_id, setBusinessID, LP_id } = useContext(BusinessContext);
    const { colors } = useTheme();
    
    const { userId } = useContext(UserContext)
    const ownerID = userId
    const axios = AxiosInstance();

    // const [deleteBusinessOpen, setDeleteBusiness] = useState(false);
    const [deleteLPOpen, setDeleteLP] = useState(false);

    const DeleteLP = async () => {
        await axios.delete(`/api/delete/LP?businessID=${businessID}`).then(res => {
            const results = res.data
            setLP_id();
            setDeleteLP(false)
        }).catch(error => console.log(error))
    }


    // const DeleteBusiness = async () => {

    //     await axios.delete(`delete/business?ownerID=${ownerID}`).then(res => {
    //         setBusinessID();
    //         navigation.navigate('UserProfile')
    //     }).catch(error => console.log(error));
    // }

    const onClose = () => {
        setDeleteLP(false)

    }
    // const onCloseBusiness = () => {
    //     setDeleteBusiness(false)

    // }
    const cancelRef = useRef(null);
    if (!loyaltyProgramme) return (
        <Loading></Loading>
    );

    return (
        <>
            <Header />
            <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center',  }}>
                <VStack space={3} safeArea='8' >
                    <Box variant='pageTitle'>
                        <Heading style={styles.pageTitle}>{businessName}</Heading>
                    </Box>

                    {loyaltyProgramme == 'none' && members == undefined && <Box variant='section'>
                        <Text variant='section'>You currently have no loyalty programme for your business</Text>
                        <Button onPress={() => { navigation.navigate('NewLP') }}>Add Loyalty Programme</Button>
                    </Box>}

                    {loyaltyProgramme !== 'none' && <Box variant='section' style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <QRCode
                            color={colors.primary['700']}
                            backgroundColor={colors.light['50']}
                            value={JSON.stringify(loyaltyProgramme.id)}
                        />
                        <Text variant='section'>{'Scan to stamp customer loyalty card'}</Text>
                        {members == undefined && <Text>{`${0} active members on programme`}</Text>}
                        {members !== undefined && <Text>{`${members} active members on programme`}</Text>}
                        {loyaltyProgramme.stamps !== undefined && <Text>{`${loyaltyProgramme.stamps} stamps for ${loyaltyProgramme.reward}`}</Text>}
                        {loyaltyProgramme.stamps == undefined && <Text>{`${loyaltyProgramme.stampsRequired} stamps for ${loyaltyProgramme.reward}`}</Text>}
                        <HStack space={3} justifyContent="center" >
                            <Button onPress={() => navigation.navigate('EditLP')}>Edit</Button>
                            {/* <Button onPress={DeleteLP}>Delete</Button> */}
                            <Button colorScheme="danger" onPress={() => setDeleteLP(!deleteLPOpen)}>
                                Delete
                            </Button>
                            <AlertDialog leastDestructiveRef={cancelRef} isOpen={deleteLPOpen} onClose={onClose}>
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton />
                                    <AlertDialog.Header>Delete Loyalty Programme</AlertDialog.Header>
                                    <AlertDialog.Body>
                                        This will remove all data relating to this loyalty programme. This action cannot be
                                        reversed. Deleted data can not be recovered.
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="danger" onPress={DeleteLP}>
                                                Delete
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                        </HStack>
                    </Box>}
                    <HStack space={3} justifyContent="center" >
                        {/* <Button onPress={() => navigation.navigate('EditBusiness')}>Edit Business</Button>

                        <Button colorScheme="danger" onPress={() => setDeleteBusiness(!deleteBusinessOpen)}>
                            Delete Business
                        </Button> */}
                        {/* <AlertDialog leastDestructiveRef={cancelRef} isOpen={deleteBusinessOpen} onClose={onCloseBusiness}>
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>Delete Business</AlertDialog.Header>
                                <AlertDialog.Body>
                                    This will remove all data relating to the business. This action cannot be
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
                        </AlertDialog> */}
                    </HStack>

                </VStack>

                <Button colorScheme="success" onPress={() => navigation.navigate('RewardScanner')}>Redeem Customer Reward</Button>

            </Box>
        </>
    );
}