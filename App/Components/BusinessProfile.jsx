import { Button, Text, Heading, Box, HStack, VStack, useTheme } from "native-base";
import { useContext, useState } from 'react';
import BusinessContext from '../Contexts/BusinessContext';
import UserContext from "../Contexts/UserContext";
import styles from '../Styles/style';
import QRCode from 'react-native-qrcode-svg';
import axios from "axios";
import { ScrollView, Switch } from 'react-native';

// import RemoveLP from "./DeleteLP";

export default function BusinessProfile({ navigation }) {
    const { businessName, loyaltyProgramme, businessID, setLoyaltyProgramme } = useContext(BusinessContext);
    const { colors } = useTheme();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // const [preview, setPreview] = useState(false)
    const {userId} = useContext(UserContext)
    const ownerID = userId
    

    const DeleteLP = () => {
        axios
            .delete(`https://gwi22-dramaticwire.herokuapp.com/api/delete/LP?businessID=${businessID}`)
            .then((result => {
                const results = result.data
                setLoyaltyProgramme({ stampsRequired: null, reward: null, timeFrame: null, members: null });
                console.log('deleted');
                // navigation.navigate('NewLP')

            })).catch(error => console.log(error));
    }
    const toggleProfiles = () => {
        toggleSwitch
        navigation.navigate('UserProfile')
      }

    const DeleteBusiness = () => {
        axios
            .delete(`https://gwi22-dramaticwire.herokuapp.com/api/delete/business?ownerID=${ownerID}`)
            .then((result => {
                const results = result.data
                console.log('deleted business');
                navigation.navigate('UserProfile')

            })).catch(error => console.log(error));
    }


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
                {!loyaltyProgramme && <Box variant='section'>
                    <Text variant='section'>You currently have no loyalty programme for your business</Text>
                    <Button onPress={() => { navigation.navigate('NewLP') }}>Add Loyalty Programme</Button>
                </Box>}
                {loyaltyProgramme?.stampsRequired && <Box variant='section' style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <QRCode
                        color={colors.primary['700']}
                        backgroundColor={colors.light['50']}
                        value={loyaltyProgramme.id}
                    />
                    <Text variant='section'>{'Scan to stamp customer loyalty card'}</Text>
                    <Text>{`${loyaltyProgramme.members} active members on programme`}</Text>
                    <Text>{`${loyaltyProgramme.stampsRequired} stamps for ${loyaltyProgramme.reward}`}</Text>
                    <HStack space={3} justifyContent="center" >
                        <Button onPress={() => navigation.navigate('EditLP')}>Edit</Button>
                        <Button onPress={DeleteLP}>Delete</Button>

                    </HStack>


                </Box>}
                <HStack space={3} justifyContent="center" >
                        <Button onPress={() => navigation.navigate('EditBusiness')}>Edit Business</Button>
                        <Button onPress={DeleteBusiness}>Delete Business</Button>
                </HStack>

            </VStack>
        </Box>
    );
}