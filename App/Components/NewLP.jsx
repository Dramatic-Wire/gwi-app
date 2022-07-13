import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, HStack} from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function NewLP() {
  const [stampCount, setStampCount] = useState(0);
  const [selected, setSelected] = useState();
  const [reward, setReward] = useState('');
  const [preview, setPreview] = useState(false)
  const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];

  const handleTimeFrameSelection = (index) => {
    setSelected(index);
  }

  const missingInfo = stampCount > 0 && reward != '' && selected >= 0 ? false : true;

  const handleSave = () => {}

  return (
    <View>
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
      <Input style={{width:'auto'}} placeholder='A free item or discount' onChangeText={text => setReward(text)} />
      </Box>

      <Box variant='section' >
        <Text variant='section'>Valid for</Text>
        <Button.Group >
          {timeframeOptions.map((time, index) => <Button style={styles.chipBtn} size='sm' key={time} value={index} onPress={() => handleTimeFrameSelection(index)} variant={selected == index ? 'solid' : 'outline'} >{time}</Button>)}
        </Button.Group>
     
      </Box>
      <HStack space={3} justifyContent="center" >
      <Button isDisabled={missingInfo}  onPress={() => setPreview(true)}>Preview</Button>
      <Button isDisabled={missingInfo} onPress={handleSave}>Save</Button>
      </HStack>
      {preview == true && <LoyaltyCard stampCount={stampCount} validFor={timeframeOptions[selected]} reward={reward} onClose={setPreview} open={preview} />}
    </View>
  );
}