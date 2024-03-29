import { ScrollView, Switch } from 'react-native';
import { useContext, useState } from 'react';
import UserContext from '../Contexts/UserContext';
import { Button, Text, Heading, Box, VStack, useTheme, HStack, Pressable, Actionsheet, useDisclose, IconButton, Input } from "native-base";
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

import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './LoginScreen';
import BusinessProfile from './BusinessProfile';

export default function UserProfile({ navigation }) {
  const Drawer = createDrawerNavigator();
  const { colors } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState()
  const { businessName, loyaltyProgramme, businessID, setBusinessID } = useContext(BusinessContext);
  const { first_name, LP, setLP, userId, setUserId, setSurname, setFirst_name, setProfile_picture, focusLP, setFocusLP } = useContext(UserContext);


  const searchCards = (e) => {
    if (e) {
      const displayFilter = LP.filter(function (filtered) {
        return filtered.business_name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
      });
      setSearch(e)
      setSearchResults(displayFilter)
    }
    else {
      setSearchResults(LP)
    }
  }


  if (!first_name || !LP) return (<Loading></Loading>);
  return (
    <>
      <VStack space={4} alignItems='center' bg='white' height={'100%'}>
        <Header navigation={navigation}></Header>
        <LoyaltyCard navigation={navigation}></LoyaltyCard>
        {Array.isArray(LP) && 
        <Input 
          variant="outline"
          placeholder="Search loyalty cards"
          width="92%"
          borderRadius="4"
          py="3"
          px="1"
          InputLeftElement={<Icon name="search" m="5" ml="3" size={16} color="gray.400" style={{marginLeft: 5}}/>}
          onChangeText={(text) => searchCards(text)} />
          }
        <ScrollView width="100%" alignItems='center' horizontal={false} alwaysBounceHorizontal={false}>

          <VStack space={3} safeArea='8' width='92.5%' rounded={'sm'} bg='#5f9cda' justifyContent='center'>
            <Box>
              {!Array.isArray(LP) && <Text variant='section' color={'white'} style={{textAlign: 'center'}}>You are currently not part of any loyalty programmes</Text>}
            </Box>
            <HStack maxW={'100%'} flexWrap='wrap' alignItems={'flex-end'} justifyContent='space-evenly'>
              {Array.isArray(searchResults) && searchResults.map((element, index) => { return <Pressable key={index} onPress={() => { setFocusLP({ ...element }) }}><CardIcon card={element} /></Pressable> })}
              {!Array.isArray(searchResults) && Array.isArray(LP) && LP.map((element, index) => { return <Pressable key={index} onPress={() => { setFocusLP({ ...element }) }}><CardIcon card={element} /></Pressable> })}

            </HStack>
          </VStack>
          {focusLP && focusLP.stampsneeded > focusLP.stamps && <LoyaltyCard stampCount={parseInt(focusLP.stampsneeded)} stamped={parseInt(focusLP.stamps)} name={focusLP.business_name} validFor={focusLP.valid_for} reward={focusLP.reward} LPCategory={focusLP.category} onClose={() => { setFocusLP() }} open={focusLP != undefined} />}
          {focusLP && focusLP.stampsneeded <= focusLP.stamps && <RewardCode onClose={() => { setFocusLP() }} LP={focusLP} customer_id={userId} open={focusLP != undefined} />}
          {focusLP && console.log(Number(focusLP.stampsneeded) <= Number(focusLP.stamps))}
          {focusLP && console.log(focusLP.stampsneeded <= focusLP.stamps)}

        </ScrollView>
        <Pressable justifySelf='flex-start'  rounded={'full'}  bg='#b8dbbb' shadow={2} p={2} onPress={() => { navigation.navigate('BarcodeScanner') }} width='30%' marginBottom={'30px'} >
          <Boot height={80} width={70} alignSelf='center' />
        </Pressable>
      </VStack>
    </>
  )
}