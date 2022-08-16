import { ScrollView, Switch } from 'react-native';
import { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton } from "native-base";
import styles from '../Styles/style';
import CardIcon from './CardIcon';
import Loading from './Loading';
import StampIcon from './Icons/StampIcon';
import LoyaltyCard from './LoyaltyCard';
import RewardCode from './RewardCode';
import BusinessContext from '../Contexts/BusinessContext';
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from './Header';
import Boot from './Icons/Boot';

export default function UserProfile({ navigation }) {
  const { colors } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isVisible, setIsVisible] = useState(false);

  const { businessName, loyaltyProgramme, businessID, setBusinessID } = useContext(BusinessContext);
  const { first_name, LP, userId, setUserId, setUsername, setSurname, setFirst_name, setProfile_picture, focusLP, setFocusLP } = useContext(UserContext);

  const handleLogout = () => {
    setBusinessID()
    setUserId();
    setUsername();
    setFirst_name();
    setSurname();
    setProfile_picture();
    navigation.navigate('LoginScreen')
  }
  const toggleProfiles = () => {
    toggleSwitch
    navigation.navigate('BusinessProfile')
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  if (!first_name || !LP) return (<Loading></Loading>);

  return (
    <>
      <VStack space={4} alignItems='center' bg='primary.900' height={'100%'}>
        <Header navigation={navigation}></Header>
        <LoyaltyCard navigation={navigation}></LoyaltyCard>
        <ScrollView width="100%" alignItems='center' horizontal={false} alwaysBounceHorizontal={false}>

          <VStack space={3} safeArea='8' width='92.5%' rounded={'sm'} bg='primary.200' justifyContent='center'>
            <Box>
              {!Array.isArray(LP) && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
              {/* */}
            </Box>
            <HStack maxW={'100%'} flexWrap='wrap' alignItems={'flex-end'}>
              {Array.isArray(LP) && LP.map((element, index) => { return <Pressable key={index} onPress={() => { setFocusLP({ ...element }) }}><CardIcon card={element} /></Pressable> })}
            </HStack>
          </VStack>
          {focusLP && focusLP.stampsneeded > focusLP.stamps && <LoyaltyCard stampCount={parseInt(focusLP.stampsneeded)} stamped={parseInt(focusLP.stamps)} name={focusLP.business_name} validFor={focusLP.valid_for} reward={focusLP.reward} LPCategory={focusLP.category} onClose={() => { setFocusLP() }} open={focusLP != undefined} />}
          {focusLP && focusLP.stampsneeded <= focusLP.stamps && <RewardCode onClose={() => { setFocusLP() }} LP={focusLP} customer_id={userId} open={focusLP != undefined} />}
          {focusLP && console.log(Number(focusLP.stampsneeded) <= Number(focusLP.stamps))}
          {focusLP && console.log(focusLP.stampsneeded <= focusLP.stamps)}
          
        </ScrollView>
        <Pressable justifySelf='flex-start' rounded={'sm'} bg='primary.200' shadow={2} p={2} onPress={() => { navigation.navigate('BarcodeScanner') }} width='92.5%' >
            <Boot height={150} width={150} alignSelf='center' />
            <Text alignSelf='center' fontSize={'lg'} >stamp those stamps to earn rewards</Text>
          </Pressable>
      </VStack>
    </>)
}