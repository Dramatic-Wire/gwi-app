import { ScrollView, } from 'react-native';
import { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable } from "native-base";
import styles from '../Styles/style';
import CardIcon from './CardIcon';
import Loading from './Loading';
import StampIcon from './Icons/StampIcon';
import LoyaltyCard from './LoyaltyCard';
import RewardCode from './RewardCode';

export default function UserProfile({ navigation }) {
  const { colors } = useTheme()
  const { first_name, LP, userId } = useContext(UserContext);
  const [focusLP, setFocusLP] = useState();

  if (!first_name || !LP) return (<Loading></Loading>);
  

  return (
    <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
        <VStack space={3} safeArea='8' justifyContent='center'>
          <Box variant='pageTitle'>
            <Heading style={styles.pageTitle}>Welcome {first_name}!</Heading>
          </Box>
          {/* <Box>
            <Button onPress={() => { navigation.navigate('RegisterBusiness')}} >Add a business</Button>
          </Box> */}
          <Box>
            {!Array.isArray(LP) && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
            {/* <Button onPress={() => { navigation.navigate('BarcodeScanner') }}>Join a Loyalty Programme</Button> */}
          </Box>
          <HStack maxW={'100%'} flexWrap='wrap' alignItems={'flex-end'}>
            {Array.isArray(LP) && LP.map((element, index) => { return <Pressable key={index} onPress={() => { setFocusLP({...element})}}><CardIcon  card={element} /></Pressable>})}
          </HStack>
        </VStack>
         {focusLP && focusLP.stampsneeded > focusLP.stamps && <LoyaltyCard stampCount={parseInt(focusLP.stampsneeded)} stamped={parseInt(focusLP.stamps)} name={focusLP.business_name} validFor={'validFor'} reward={focusLP.reward} LPCategory={focusLP.category} onClose={() => {setFocusLP()}} open={focusLP != undefined} />}
         {focusLP && focusLP.stampsneeded <= focusLP.stamps && <RewardCode  onClose={() => {setFocusLP()}} LP={focusLP} customer_id={userId} open={focusLP != undefined} />}
      </ScrollView>
      <Box width='100%'>

      <Box bgColor={'primary.700'} width='100%' alignItems={'center'} padding={5} marginBottom={-50} paddingBottom={60} borderColor='primary.200' borderTopWidth={4}>
      <Pressable justifySelf='flex-start' rounded={'full'} bgColor='primary.800' p={4} onPress={() => { navigation.navigate('BarcodeScanner') }}  width='90' height='90' marginTop={-45} borderColor='primary.200' borderWidth={4}>
      <StampIcon justifySelf='center'/>
      </Pressable>
      </Box>
      </Box>
    </Box>
  )
}