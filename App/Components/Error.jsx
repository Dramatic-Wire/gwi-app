import { ScrollView, } from 'react-native';
import { Button, Box, VStack, useTheme, Text } from "native-base";
import ErrorIcon from './Icons/ErrorIcon';


export default function Error({ navigation }) {
    const { colors } = useTheme()

    return (
        <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false} justifyContent='center'>
                <VStack space={3} safeArea='8' justifyContent='center'>
                    <ErrorIcon />
                    <Text style={{textAlign: 'center', color: 'white'}}>Oops, something went wrong</Text>
                    <Button onPress={() => { navigation.navigate('UserProfile') }}>Back to profile</Button>
                </VStack>
            </ScrollView>
        </Box>
    )
}