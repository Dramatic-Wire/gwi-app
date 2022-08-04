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

export default function UserProfile({ navigation }) {
  const { colors } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [focusLP, setFocusLP] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const { businessName, loyaltyProgramme, businessID, setBusinessID } = useContext(BusinessContext);
  const { first_name, LP, userId, setUserId, setUsername, setSurname, setFirst_name, setProfile_picture } = useContext(UserContext);

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
      <Header></Header>
      <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content onClose={onClose}>
            <Button onPress={() => { navigation.navigate('RegisterBusiness') }} >Add a business</Button>
            <Button onPress={() => { navigation.navigate('LoginScreen') }} >Delete account</Button>

            {businessID > 0 &&
              <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleProfiles}
                value={isEnabled} />
            }
          </Actionsheet.Content>
        </Actionsheet>
        <ScrollView width="100%" h="80" horizontal={false} alwaysBounceHorizontal={false}>
          <VStack space={3} safeArea='8' justifyContent='center'>
            <Box>
              {!Array.isArray(LP) && <Text variant='section'>You are currently not part of any loyalty programmes</Text>}
              {/* */}
            </Box>
            <HStack maxW={'100%'} flexWrap='wrap' alignItems={'flex-end'}>
              {Array.isArray(LP) && LP.map((element, index) => { return <Pressable key={index} onPress={() => { setFocusLP({ ...element }) }}><CardIcon card={element} /></Pressable> })}
            </HStack>
          </VStack>
          {focusLP && focusLP.stampsneeded > focusLP.stamps && <LoyaltyCard stampCount={parseInt(focusLP.stampsneeded)} stamped={parseInt(focusLP.stamps)} name={focusLP.business_name} validFor={'validFor'} reward={focusLP.reward} LPCategory={focusLP.category} onClose={() => { setFocusLP() }} open={focusLP != undefined} />}
          {focusLP && focusLP.stampsneeded <= focusLP.stamps && <RewardCode onClose={() => { setFocusLP() }} LP={focusLP} customer_id={userId} open={focusLP != undefined} />}
        </ScrollView>

        <Box width='100%'>

          <HStack bgColor={'primary.700'} width='100%' alignItems={'center'} padding={5} marginBottom={-50} paddingBottom={60} borderColor='primary.200' borderTopWidth={4} justifyContent={'space-between'}>

            <Pressable justifySelf='flex-start' rounded={'full'} bgColor='primary.800' p={4} onPress={() => { navigation.navigate('BarcodeScanner') }} width='90' height='90' marginTop={-45} borderColor='primary.200' borderWidth={4}>
              <StampIcon justifySelf='center' />
            </Pressable>
            <Button onPress={handleLogout}>Logout</Button>

          </HStack>
        </Box>

      </Box>
    </>
  )
}