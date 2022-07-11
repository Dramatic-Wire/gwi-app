import { Text, View,  } from 'react-native';
import { Button, Input, Chip } from "@rneui/themed";
import { useState } from 'react';
import styles from '../Styles/style';

export default function NewLP() {
  const [stampCount, setStampCount] = useState(0);
  const [selected, setSelected] = useState();
  const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];

  const handleTimeFrameSelection = (index) => {
    setSelected(index);
  }


  return (
    <View>
      <Text>Create a new loyalty programme</Text>
      <View style={{padding: 10}}>
      <Text>Number of stamps on each card</Text>
        <Button title='−' onPress={() => {if(stampCount > 0) setStampCount(stampCount - 1)}}  disabled={stampCount == 0 ? true : false} color='blue' />
        <Text>{ stampCount}</Text>
      <Button title='+' onPress={() => {setStampCount(stampCount + 1)}} color='blue'/>
      </View>
      <View>
      <Input style={{width:'auto'}} placeholder='Customer reward'/>
      </View>
      <View>
      <Text>Valid for</Text>
      {timeframeOptions.map((time,index) => <Chip buttonStyle={selected == index ? styles.chipBtnSelected : styles.chipBtn}  key={time} title={time} value={index} onPress={() => handleTimeFrameSelection(index)} ></Chip>)}
      </View>
      <Button title='Preview card' />
    </View>
  );
}

