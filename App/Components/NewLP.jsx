import { Button, Input, Text, IconButton, Heading, Box, HStack, VStack} from "native-base";
import { useState, useContext } from 'react';
import BusinessContext from "../Contexts/BusinessContext";
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';


export default function NewLP({ navigation }) {
  const { setLoyaltyProgramme, businessID } = useContext(BusinessContext)
  const [stampCount, setStampCount] = useState(0);
  const [validFor, setValidFor] = useState('');
  const [reward, setReward] = useState('');
  const [preview, setPreview] = useState(false)
  const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];

  const handleTimeFrameSelection = (timeFrame) => {
    setValidFor(timeFrame);
  }

  const missingInfo = stampCount > 0 && reward !== '' && validFor !== '';

  
  const registerLP = () => {
     axios
        .post(`https://gwi22-dramaticwire.herokuapp.com/api/addLP`,  {businessID, stampCount, reward, validFor})
        .then((result => {
          const results = result.data
          // console.log(results);
          // if (results.message == 'added') {
          // }
          setLoyaltyProgramme({ stampsRequired: stampCount, reward: reward, timeFrame: validFor, members:0 });
          navigation.navigate('BusinessProfile')
          console.log(results.message);
          
        })).catch(error => console.log(error));
}

  return (
    <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}>
        <Box style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}  >
    <VStack space={3} safeArea='8'>
      <Box variant='pageTitle'>
      <Heading size='md'>Create a new loyalty programme</Heading>
      </Box>
      <Box variant='section'>
        <Text variant='section' >Number of stamps on each card</Text>
        <Box style={{flexDirection:'row' , justifyContent:'center', alignItems:'center'}} >
          <IconButton icon={<Icon name='minus-circle' size={20} color='black'/> } onPress={() => {if(stampCount > 0) setStampCount(stampCount - 1)}}  disabled={stampCount == 0 ? true : false} />
          <Text style={{ margin: 5, fontSize: 20 }}>{stampCount}</Text>
          <IconButton icon={<Icon name='plus-circle' size={20} color='black'/> } onPress={() => {setStampCount(stampCount + 1)}}/>
        </Box>
      </Box>

      <Box variant='section'>
        <Text variant='section'>Customer reward</Text>
      <Input placeholder='A free item or discount' onChangeText={text => setReward(text)} />
      </Box>

      <Box variant='section' >
        <Text variant='section'>Valid for</Text>
        <HStack space={2} flexWrap='wrap'>
          {timeframeOptions.map((time, index) => <Button size={'sm'}  key={time} value={index} onPress={() => handleTimeFrameSelection(time)} variant={validFor == time ? 'chipSelected' : 'chip'} >{time}</Button>)}
        </HStack>
     
      </Box>
      <HStack space={3}  justifyContent="center" >
      <Button isDisabled={!missingInfo}  onPress={() => setPreview(true)}>Preview</Button>
      <Button isDisabled={!missingInfo} onPress={registerLP}>Save</Button>
      </HStack>
      {preview == true && <LoyaltyCard stampCount={stampCount} validFor={validFor} reward={reward} onClose={setPreview} open={preview} />}
        </VStack>
      </Box>
      </Box>
  );
}