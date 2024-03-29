import { ScrollView, } from 'react-native';
import { Button, Box, VStack, useTheme, Text} from "native-base";
import { useContext, useState } from 'react';
import SuccessIcon from './Icons/SuccessIcon';
import LoyaltyCard from './LoyaltyCard';
import BusinessContext from '../Contexts/BusinessContext';

export default function Success({ navigation }) {
    const { colors } = useTheme()
    const { businessID } = useContext(BusinessContext);

    return (
        <Box safeArea bg={colors.primary['200']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false} justifyContent='center'>
                <VStack space={3} safeArea='8' justifyContent='center'>
                <LoyaltyCard navigation={navigation}></LoyaltyCard>

                    <SuccessIcon />
                    <Text style={{textAlign: 'center', color: 'white', fontSize: '20px'}}>Stamp successfully added</Text>

                    <Button onPress={() => { navigation.navigate('UserProfile') }} variant={'subtle'}>Back to profile</Button>
                </VStack>
            </ScrollView>
        </Box>
    )
}