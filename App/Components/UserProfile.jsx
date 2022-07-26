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
  let results
  const { email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture, customer_id, setCustomer_Id } = useContext(UserContext);
  // const { customerName, validFor, stampCount, stamped, reward } = useContext(UserContext);
  axios
    .get(`https://gwi22-dramaticwire.herokuapp.com/api/user?email=${email}`, { email, password })
    .then((result => {

      setFirst_name(result.data.first_name)
      setCustomer_Id(result.data.id)

    })).catch(error => console.log(error));
  axios
    .get(`https://gwi22-dramaticwire.herokuapp.com/api/stamps?customer_id=${customer_id}`)
    .then((result => {
      results = result

    })).catch(error => console.log(error));

  return (
    <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {first_name}!</Heading>
          </Box>
          {results == undefined && <Box variant='section'>
            <Box variant='section'>
              <Text variant='section'>You are currently not part of any loyalty programmes</Text>
              <Button onPress={() => { navigation.navigate('Barcode')}}>Join a Loyalty Programme</Button>
            </Box>
          </Box>}

          {results !== undefined && <Box variant='section'>
            <CardIcon />
          </Box>}
          {/* <LoyaltyCard/> */}

          {/* <CardIcon />
          <CardIcon />
          <CardIcon />
          <CardIcon />
          <CardIcon /> */}
        </VStack>
      </ScrollView>
    </Box>
  )
}