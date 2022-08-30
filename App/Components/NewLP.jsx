import { Button, Input, Text, IconButton, Heading, Box, HStack, VStack, ScrollView, useTheme } from "native-base";
import { useState, useContext } from 'react';
import BusinessContext from "../Contexts/BusinessContext";
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
// import axios from 'axios';
import UserContext from "../Contexts/UserContext";
import AxiosInstance from "../Hooks/AxiosInstance";

export default function NewLP({ navigation }) {
  const axios = AxiosInstance();
  const { setLoyaltyProgramme, businessID } = useContext(BusinessContext)
  const [stamps, setStamps] = useState(0);
  const [validFor, setValidFor] = useState('');
  const [reward, setReward] = useState('');
  const [preview, setPreview] = useState(false)
  const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];
  const business_id = businessID
  const { colors } = useTheme();

  const handleTimeFrameSelection = (timeFrame) => {
    setValidFor(timeFrame);
  }

  const missingInfo = stamps > 0 && reward !== '' && validFor !== '';



  const registerLP = () => {
     axios
        // .post(`https://gwi22-dramaticwire.herokuapp.com/api/addLP`,  {business_id, stamps, reward, validFor})
        .post(`/api/addLP`,  {business_id, stamps, reward, validFor})
        .then((res => {
          setLoyaltyProgramme(res.data)
          navigation.navigate('BusinessProfile')
          
        })).catch(error => console.log(error));
  }

  return (
    <Box safeArea bg='#b8dbbb' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ScrollView>

      <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}  >
        <VStack space={3} safeArea='8'>
          <Box variant='pageTitle' style={{backgroundColor: colors.primary['200']}}>
            <Heading size='md'>Create a new loyalty programme</Heading>
          </Box>
          <Box variant='section'>
            <Text variant='section'>Number of stamps on each card</Text>
            <Box style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <IconButton icon={<Icon name='minus-circle' size={20} color='black' />} onPress={() => { if (stamps > 0) setStamps(stamps - 1) }} disabled={stamps == 0 ? true : false} />
              <Text style={{ margin: 5, fontSize: 20 }}>{stamps}</Text>
              <IconButton icon={<Icon name='plus-circle' size={20} color='black' />} onPress={() => { setStamps(stamps + 1) }} />
            </Box>
          </Box>

          <Box variant='section'>
            <Text variant='section'>Customer reward</Text>
            <Input placeholder='A free item or discount' onChangeText={text => setReward(text)} />
          </Box>

          <Box variant='section' >
            <Text variant='section'>Valid for</Text>
            <HStack space={2} flexWrap='wrap'>
              {timeframeOptions.map((time, index) => <Button size={'sm'} key={time} value={index} onPress={() => handleTimeFrameSelection(time)} variant={validFor == time ? 'chipSelected' : 'chip'} >{time}</Button>)}
            </HStack>

          </Box>
          <HStack space={3} justifyContent="center" >
            <Button isDisabled={!missingInfo} onPress={() => setPreview(true)} variant={'subtle'}>Preview</Button>
            <Button isDisabled={!missingInfo} onPress={registerLP} variant={'subtle'}>Save</Button>
          </HStack>
          <Button onPress={() => { navigation.navigate('BusinessProfile') }} variant={'subtle'}>Cancel</Button>
          {preview == true && <LoyaltyCard stampCount={stamps} validFor={validFor} reward={reward} onClose={setPreview} open={preview} />}
        </VStack>
      </Box>
      </ScrollView>

    </Box>
  );
}