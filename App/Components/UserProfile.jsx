import { ScrollView, } from 'react-native';
import { useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, } from "native-base";
import styles from '../Styles/style';
import CardIcon from './CardIcon';
import Loading from './Loading';

export default function UserProfile({ navigation }) {
  const { colors } = useTheme()

  const { first_name, LP } = useContext(UserContext);

  if (!first_name || !LP) return (<Loading></Loading>);
  

  return (
    <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {first_name}!</Heading>
          </Box>
          <Box>
            <Button onPress={() => { navigation.navigate('RegisterBusiness')}} >Add a business</Button>
          </Box>
          <Box variant='section'>
            {!Array.isArray(LP) && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
            <Button onPress={() => { navigation.navigate('BarcodeScanner') }}>Join a Loyalty Programme</Button>
          </Box>
          {Array.isArray(LP) && LP.map((element, index) => { return <CardIcon key={index} card={element} /> })}
        </VStack>
      </ScrollView>
    </Box>
  )
}