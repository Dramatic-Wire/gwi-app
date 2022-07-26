import { View,} from 'react-native';
import { Modal, Box, Text, Heading } from 'native-base';


export default function RemoveLP({onClose, open, color = 'emerald'}){

    const DeleteLP = () => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/delete/LP`, { business_id })
            .then((result => {
                const results = result.data
                console.log(result.data.result);

            })).catch(error => console.log(error));
    }
    
  return (
    <Modal isOpen={open} size='lg' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{bg:'muted[800]', opacity:0.9}} >
    <Box bgColor={`${color}.300`} rounded='lg' p="5" m='5' shadow='5'>
        <Box>
        <Heading size='sm' textAlign={'left'}>Are you sure you would like to delete?</Heading>
        <Text>
          This action in irreversable.
        </Text>
        </Box>
        {/* <View style={{ flexDirection: "row", flexWrap: 'wrap',  width:'auto', justifyContent:'center' }}>
       
        </View> */}
      </Box>
      </Modal>
      );
}