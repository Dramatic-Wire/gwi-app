import { Button, Text, Heading, Box, HStack, VStack, useTheme } from "native-base";
import { useContext } from 'react';
import BusinessContext from '../Contexts/BusinessContext';
import styles from '../Styles/style';
import QRCode from 'react-native-qrcode-svg';
import axios from "axios";
// import RemoveLP from "./DeleteLP";


export default function BusinessProfile({ navigation }) {
    const { businessName, loyaltyProgramme, businessID } = useContext(BusinessContext);
    const { colors } = useTheme();
    // const [preview, setPreview] = useState(false)
    

    const DeleteLP = () => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/delete/LP`, { businessID })
            .then((result => {
                const results = result.data
                console.log(result.data.result);

            })).catch(error => console.log(error));
    }


    return (
        <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <VStack space={3} safeArea='8' >
                <Box variant='pageTitle'>
                    <Heading style={styles.pageTitle}>{businessName}</Heading>
                </Box>
                {!loyaltyProgramme.stampsRequired && <Box variant='section'>
                    <Text variant='section'>You currently have no loyalty programme for your business</Text>
                    <Button onPress={() => { navigation.navigate('NewLP') }}>Add Loyalty Programme</Button>
                </Box>}
                {loyaltyProgramme.stampsRequired && <Box variant='section' style={{ alignItems: 'center', justifyContent: 'center', }}>
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

            </VStack>
        </Box>
    );
}