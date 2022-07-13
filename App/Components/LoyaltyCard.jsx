import { View, useState } from 'react-native';
import { Modal, IconButton, useTheme, Box, Text, Heading } from 'native-base';
import styles from '../Styles/style';
import Stamp from './Stamp';
import Icon from 'react-native-vector-icons/FontAwesome'


export default function LoyaltyCard({stampCount, validFor, reward, customerName='Suzie Salamandar', onClose, open, stamped = 2}){
  const { colors } = useTheme()
  return (
    <Modal isOpen={open} size='lg' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{bg:colors.muted[800], opacity:0.9}} >
      <Box bg={colors.tertiary[300]} rounded='lg' p="5" m='5' shadow='5'>
        <Box>
        <Heading size='sm'>{customerName}</Heading>
        <Text>
          { `valid for: ${validFor}`  }
        </Text>
        </Box>
        <View style={{ flexDirection: "row", flexWrap: 'wrap',  width:'auto', justifyContent:'center' }}>
       {[...Array(stampCount)].map((e, i) => <Stamp key={i} stamped={i < stamped ? true : false}></Stamp>)}
          <Box variant={stamped == stampCount ? 'stamped' : 'unstamped'} style={{ paddingLeft:10, paddingRight:10, flexGrow:1, width:'auto' }}>
            <Text fontSize='lg' bold>
          {reward}
            </Text>
       </Box>
        </View>
      </Box>
      </Modal>
      );
}