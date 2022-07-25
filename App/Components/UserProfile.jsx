import { ScrollView, } from 'react-native';
import { useState, useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack, VStack, useTheme, } from "native-base";
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import CardIcon from './CardIcon';


export default function UserProfile() {
  const { email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture } = useContext(UserContext);
  // const { customerName, validFor, stampCount, stamped, reward } = useContext(UserContext);

  const { colors } = useTheme()


  return (
    <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {first_name}!</Heading>
          </Box>
          {/* <Box variant='section'>
                <Text variant='section'>You are currently not part of any loyalty programmes</Text>
                <Button>Join a Loyalty Programme</Button>
            </Box> */}

          {/* <LoyaltyCard/> */}
          <CardIcon />
          <CardIcon />
          <CardIcon />
          <CardIcon />
          <CardIcon />
          <CardIcon />
        </VStack>
      </ScrollView>
    </Box>
  )
}