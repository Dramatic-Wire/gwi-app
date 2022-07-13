import { View, useState } from 'react-native';
import { Modal, IconButton, useTheme, Box, Text, Heading } from 'native-base';
import styles from '../Styles/style';
import Stamp from './Stamp';
import Icon from 'react-native-vector-icons/FontAwesome'


export default function LoyaltyCard({stampCount, validFor, reward, customerName='Suzie Salamandar', onClose, open}){
  const { colors } = useTheme()
  return (
    <Modal isOpen={open} size='full' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{bg:colors.primary[200], opacity:0.9}} >
      <Box bg={colors.tertiary[300]} rounded='lg' p="5" m='5' width='80%' shadow='5'>
        <Box>
        <Heading size='sm'>{ customerName}</Heading>
        <Text>
          { `valid for: ${validFor}`  }
        </Text>
        </Box>
        <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
       {[...Array(stampCount)].map((e, i) => <Stamp key={i}></Stamp>)}
       <Text>{reward}</Text>
        </View>
        
      </Box>
      </Modal>
      );
}