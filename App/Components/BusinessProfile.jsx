import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack, VStack } from "native-base";
import { useContext } from 'react';
import BusinessContext from '../Contexts/BusinessContext';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import QRCode from 'react-native-qrcode-svg';


export default function BusinessProfile({ navigation }) {
    const { businessName, loyaltyProgramme } = useContext(BusinessContext);
    

    return (
             <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}>
        <Box style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}  >
        <VStack space={3} safeArea='8'>
            <Box variant='pageTitle'>
                        <Heading style={styles.pageTitle}>{businessName}</Heading>
            </Box>
            {!loyaltyProgramme.stampsRequired && <Box variant='section'>
                <Text variant='section'>You currently have no loyalty programme for your business</Text>
                <Button onPress={() => { navigation.navigate('NewLP')}}>Add Loyalty Programme</Button>
            </Box>}
        {loyaltyProgramme.stampsRequired && <Box variant='section'>
            <Heading size="sm">Your Loyalty Programme Details</Heading>
            <QRCode
                value={businessName}
            />
            <Text>{`${loyaltyProgramme.members} active members on programme`}</Text>
            <Text>{`${loyaltyProgramme.stampsRequired} stamps for ${loyaltyProgramme.reward}`}</Text>
            <HStack space={3} justifyContent="center" >
                <Button >Edit</Button>
                <Button >Delete</Button>
            </HStack>
        </Box>}

                </VStack>
            </Box>
            </Box>
    );
}