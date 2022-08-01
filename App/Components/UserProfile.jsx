import { ScrollView, } from 'react-native';
import { useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable } from "native-base";
import styles from '../Styles/style';
import CardIcon from './CardIcon';
import Loading from './Loading';
import StampIcon from './Icons/StampIcon';


export default function UserProfile({ navigation }) {
  const { colors } = useTheme()

  const { first_name, LP, setUserId, setUsername, setSurname, setFirst_name, setProfile_picture } = useContext(UserContext);

  if (!first_name || !LP) return (<Loading></Loading>);
  const handleLogout = () => {
    setUserId();
    setUsername();
    setFirst_name();
    setSurname();
    setProfile_picture();
    navigation.navigate('LoginScreen')
  }

  return (
    <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {first_name}!</Heading>
          </Box>
<<<<<<< HEAD
        
        
        <Button onPress={() => { navigation.navigate('BarcodeScanner') }}>Join a Loyalty Programme</Button>
          {!Array.isArray(LP) && <Box variant='section'>
            <Text variant='section'>You are currently not part of any loyalty programmes</Text>
          </Box>}
=======
          <Box>
            <Button onPress={() => { navigation.navigate('RegisterBusiness')}} >Add a business</Button>
          </Box>
          <Box variant='section'>
            {!Array.isArray(LP) && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
            {/* <Button onPress={() => { navigation.navigate('BarcodeScanner') }}>Join a Loyalty Programme</Button> */}
          </Box>
          <HStack maxW={'100%'} flexWrap='wrap'>
>>>>>>> bf55099c82ab89c4e9b1061f262f7360af8c4c28
          {Array.isArray(LP) && LP.map((element, index) => { return <CardIcon key={index} card={element} /> })}
          </HStack>
        </VStack>
      </ScrollView>
<<<<<<< HEAD
      <Box>
        <Button onPress={() => { navigation.navigate('RegisterBusiness')}} >Add a business</Button>
        <Button onPress={handleLogout}>Logout</Button>
=======
      <Box width='100%'>

      <Box bgColor={'primary.700'} width='100%' alignItems={'center'} padding={5} marginBottom={-50} paddingBottom={60} borderColor='primary.200' borderTopWidth={4}>
      <Pressable justifySelf='flex-start' rounded={'full'} bgColor='primary.800' p={4} onPress={() => { navigation.navigate('BarcodeScanner') }}  width='90' height='90' marginTop={-45} borderColor='primary.200' borderWidth={4}>
      <StampIcon justifySelf='center'/>
      </Pressable>
      </Box>
>>>>>>> bf55099c82ab89c4e9b1061f262f7360af8c4c28
      </Box>
    </Box>
  )
}