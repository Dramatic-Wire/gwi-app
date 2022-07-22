import { ScrollView, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack, VStack, useTheme } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import CardIcon from './CardIcon';
import Icon from 'react-native-vector-icons/FontAwesome'
import Stamp from './Stamp';


export default function UserProfile() {
  { customerName = 'Sylvia', validFor = '1 month', stampCount = 5, stamped = 2, reward = '1 free item' }
  // const { customerName, validFor, stampCount, stamped, reward } = useContext(UserContext);

  const { colors } = useTheme()


  return (
    <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {customerName}!</Heading>
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