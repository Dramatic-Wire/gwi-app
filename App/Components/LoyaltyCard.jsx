import { View, } from 'react-native';
import { Modal, Box, Text, Heading, Button, AlertDialog } from 'native-base';
import Stamp from './Stamp';
import { useContext, useState, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import AxiosInstance from '../Hooks/AxiosInstance';

export default function LoyaltyCard({ stampCount, validFor, reward, name = 'Suzie Salamandar', onClose, open, stamped = 2, color = 'emerald', LPCategory }) {
  const axios = AxiosInstance();
  
  const { userId, LP } = useContext(UserContext);
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => setOpenAlert(false);
  const cancelRef = useRef(null);

  const deleteCard = async () => {
    await axios.post(`/deleteLoyaltyCard?id=${userId}&lp_id=${LP.id}`).then(res => {
    }).catch(error => console.log(error));
  }
  return (
    <Modal isOpen={open} size='lg' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{ bg: 'muted[800]', opacity: 0.9 }} >
      <Box bgColor={`${color}.300`} rounded='lg' p="5" m='5' shadow='5'>
        <Box>
          <Heading size='sm' textAlign={'left'}>{name}</Heading>
          <Text>
            {`valid for: ${validFor}`}
          </Text>
        </Box>
        <View style={{ flexDirection: "row", flexWrap: 'wrap', width: 'auto', justifyContent: 'center' }}>
          {[...new Array(stampCount)].map((e, i) => <Stamp key={i} stamped={i < stamped ? true : false} LPCategory={LPCategory} color={color}></Stamp>)}
          <Box variant={stamped >= stampCount ? 'stamped' : 'unstamped'} style={{ paddingLeft: 10, paddingRight: 10, flexGrow: 1, width: 'auto' }} bgColor={stamped >= stampCount ? `${color}.100` : 'muted.500'}>
            <Text color={stamped >= stampCount ? `${color}.500` : 'muted.400'} fontSize='lg' bold>
              {reward}
            </Text>
          </Box>
        </View>
       <Button onPress={() => setOpenAlert(true)}>Delete Card</Button>
      </Box>
      {/* Alert dialogue to confirm card delete */}
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={openAlert} onClose={closeAlert}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Card</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this loyalty card?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={closeAlert} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={deleteCard}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Modal>
  );
}