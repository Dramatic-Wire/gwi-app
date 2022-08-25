import { Button, Input, Text, IconButton, Heading, Box, HStack, VStack } from "native-base";
import { useState, useContext } from 'react';
import BusinessContext from "../Contexts/BusinessContext";
import UserContext from "../Contexts/UserContext";
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
// import axios from 'axios';
import AxiosInstance from "../Hooks/AxiosInstance";


export default function EditLP({ navigation }) {
  const axios = AxiosInstance();
  const { setLoyaltyProgramme, businessID, loyaltyProgramme } = useContext(BusinessContext)
  // const { stamps, reward, setStamps, setReward } = useContext(UserContext)
  const [stamps, setStamps] = useState(Number(loyaltyProgramme.stamps));
  const [valid_for, setValid_for] = useState(loyaltyProgramme.valid_for);
  const [reward, setReward] = useState(loyaltyProgramme.reward);
  const [preview, setPreview] = useState(false)
  const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];
  const business_id = businessID


  const handleTimeFrameSelection = (timeFrame) => {
    setValid_for(timeFrame);
  }

  const missingInfo = stamps > 0 && reward !== '' && valid_for !== '';

  const editLP = () => {
    axios
        .post(`/api/edit/LP`, { stamps, reward, valid_for, business_id})
        .then(
          axios
            .get(`/api/LP?id=${businessID}`)
            .then((result => {
              const results = result.data
              setLoyaltyProgramme({ stampsRequired: stamps, reward: reward, timeFrame: valid_for, members:0 });
              navigation.navigate('BusinessProfile')

            }))
        )
        .catch(error => console.log(error));
  }

  return (
    <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}  >
        <VStack space={3} safeArea='8'>
          <Box variant='pageTitle'>
            <Heading size='md'>Edit your loyalty programme</Heading>
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
            <Input value={reward} onChangeText={text => setReward(text)}></Input>
          </Box>

          <Box variant='section' >
            <Text variant='section'>Valid for</Text>
            <HStack space={2} flexWrap='wrap'>
              {timeframeOptions.map((time, index) => <Button size={'sm'} key={time} value={index} onPress={() => handleTimeFrameSelection(time)} variant={valid_for == time ? 'chipSelected' : 'chip'} >{time}</Button>)}
            </HStack>

          </Box>
          <HStack space={3} justifyContent="center" >
            <Button isDisabled={!missingInfo} onPress={() => setPreview(true)}>Preview</Button>
            <Button isDisabled={!missingInfo} onPress={editLP}>Save</Button>
            <Button onPress={() => { navigation.navigate('BusinessProfile') }} >Cancel</Button>

          </HStack>
          {preview == true && <LoyaltyCard stamps={stamps} valid_for={valid_for} reward={reward} onClose={setPreview} open={preview} />}
        </VStack>
      </Box>
    </Box>
  );
}