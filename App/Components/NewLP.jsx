import { Text, View,  } from 'react-native';
import { Button, Input, Chip, } from "@rneui/themed";
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
    <View style={{justifyContent:'flex-start'}}>
      <Text style={styles.pageTitle} >Create a new loyalty programme</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of stamps on each card</Text>
        <View style={{display:'flex', flexDirection:'row', overflow:'scroll', marginTop:5, marginBottom:5, justifyContent:'center', alignItems:'center'}}>
        <Button size='sm' title='−' onPress={() => {if(stampCount > 0) setStampCount(stampCount - 1)}}  disabled={stampCount == 0 ? true : false} />
        <Text style={{margin:5, fontSize:20}}>{ stampCount}</Text>
      <Button title='+' size='sm' onPress={() => {setStampCount(stampCount + 1)}} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer reward</Text>
      <Input style={{width:'auto'}} placeholder='A free item or discount'/>
      </View>
      <View style={styles.section} >
        <Text style={styles.sectionTitle}>Valid for</Text>
        <View style={{display:'flex', flexDirection:'row', overflow:'scroll', marginTop:5, marginBottom:5}}>
      {timeframeOptions.map((time,index) => <Chip buttonStyle={selected == index ? styles.chipBtnSelected : styles.chipBtn}  key={time} title={time} value={index} onPress={() => handleTimeFrameSelection(index)} ></Chip>)}
        </View>
      </View>
      <Button title='Preview card' />
    </View>
  );
}