import { View,} from 'react-native';
import { Modal, Box, Text, Heading } from 'native-base';
import Stamp from './Stamp';


export default function LoyaltyCard({stampCount, validFor, reward, name='Suzie Salamandar', onClose, open, stamped = 2, color = 'emerald'}){
  return (
    <Modal isOpen={open} size='lg' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{bg:'muted[800]', opacity:0.9}} >
    <Box bgColor={`${color}.300`} rounded='lg' p="5" m='5' shadow='5'>
        <Box>
        <Heading size='sm' textAlign={'left'}>{name}</Heading>
        <Text>
          { `valid for: ${validFor}`  }
        </Text>
        </Box>
        <View style={{ flexDirection: "row", flexWrap: 'wrap',  width:'auto', justifyContent:'center' }}>
       {[...Array(stampCount)].map((e, i) => <Stamp key={i} stamped={i < stamped ? true : false} color={color}></Stamp>)}
          <Box variant={stamped == stampCount ? 'stamped' : 'unstamped'} style={{ paddingLeft:10, paddingRight:10, flexGrow:1, width:'auto' }} bgColor={stamped == stampCount ? `${color}.100` : 'muted.500'}>
            <Text  color={stamped == stampCount ? `${color}.300` : 'muted.400'} fontSize='lg' bold>
          {reward}
            </Text>
       </Box>
        </View>
      </Box>
      </Modal>
      );
}