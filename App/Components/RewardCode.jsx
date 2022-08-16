import { View, } from 'react-native';
import { Modal, Box, Text, Heading, useTheme, VStack } from 'native-base';
import Stamp from './Stamp';
import QRCode from 'react-native-qrcode-svg';



export default function RewardCode({ LP, customer_id, onClose, open, color = 'emerald' }) {
  const { colors } = useTheme()
  return (
    <Modal isOpen={open} size='lg' closeOnOverlayClick={true} onClose={() => onClose(false)} backdropVisible={true} overlayVisible={true} _backdrop={{ bg: 'muted[800]', opacity: 0.9 }} >
      <VStack space={4} alignItems='center' justifyContent='space-around' bgColor={`${color}.300`} rounded='lg' p="5" m='5' shadow='5'>
        <Heading size='lg'>Congrats!</Heading>
        <Heading size='sm'>You have completed your card and can claim your reward:</Heading>
        <Heading size='md'>{LP.reward}</Heading>
        <Box >
          <QRCode
            size={200}
            color={colors.primary['700']}
            backgroundColor={colors.light['50']}
            value={JSON.stringify({ customer_id: customer_id, lp_id: LP.lp_id })}
          />
        </Box>
        <Heading size='sm'>The business will scan this code when you redeem your reward</Heading>
      </VStack>
    </Modal>
  );
}