import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack, useTheme } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import Stamp from './Stamp';

export default function UserProfile(){{customerName = 'Sylvia', validFor = '1 month', stampCount = 5, stamped = 2, reward = '1 free item'}
  const { colors } = useTheme()
  

    return(
        <View>
            <Box variant='pageTitle'>
                <Heading style={styles.pageTitle}>Welcome Sylvia!</Heading>
            </Box>
            <Box variant='section'>
                <Text variant='section'>You are currently not part of any loyalty programmes</Text>
                <Button>Join a Loyalty Programme</Button>
            </Box>
            <Box variant='section'>
                <Heading size="sm">Your Loyalty Cards</Heading>
                <Box bg={colors.tertiary[300]} rounded='lg' p="5" m='5' shadow='5'>
        <Box>
        <Heading size='sm'>{customerName}</Heading>
        <Text>
          { `valid for: ${validFor}`  }
        </Text>
        </Box>
        <View style={{ flexDirection: "row", flexWrap: 'wrap',  width:'auto', justifyContent:'center' }}>
       {[...Array(stampCount)].map((e, i) => <Stamp key={i} stamped={i < stamped ? true : false}></Stamp>)}
          <Box variant='stamped' style={{ paddingLeft:10, paddingRight:10, flexGrow:1, width:'auto' }}>
            <Text fontSize='lg' color='primary.600' bold>
          {reward}
            </Text>
       </Box>
        </View>
      </Box>
                
                
            </Box>
        </View>

    )
}