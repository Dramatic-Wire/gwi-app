import { ScrollView, } from 'react-native';
import { useState, useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack, VStack, useTheme, } from "native-base";
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import CardIcon from './CardIcon';
import axios from 'axios';


export default function UserProfile({ navigation }) {
  const { colors } = useTheme()
  const [results, setResults] = useState(false);


  const { email, password, first_name, setFirst_name, customer_id, setCustomer_Id, LP} = useContext(UserContext);



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
              {LP == undefined && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
              <Button onPress={() => { navigation.navigate('BarcodeScanner')}}>Join a Loyalty Programme</Button>
          </Box>
          {Array.isArray(LP) && LP.map(element=>{ return <CardIcon key={element} card = {element}/> }) }
       
          {/* <LoyaltyCard/> */}

          {/* <CardIcon />
          <CardIcon />
          <CardIcon card= />
          <CardIcon />
          <CardIcon /> */}
        </VStack>
      </ScrollView>
    </Box>
  )
}