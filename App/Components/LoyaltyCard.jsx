 import { Text, View, } from 'react-native';
import { Button, Input, Chip, Card, Icon } from "@rneui/themed";
import { useState } from 'react';
import styles from '../Styles/style';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import NewLP from './NewLP';

export default function LoyaltyCard(){
    const [stampCount, setStampCount] = useState(0);
    const [selected, setSelected] = useState();
    const [reward, setReward] = useState("");
    const timeframeOptions = ['1 month', '3 months', '6 months', '1 year'];

    return (
        <View style={{borderStyle: 'solid', borderColor: 'blue', borderWidth: 3, padding:5}} >
        <Card.Title>Card</Card.Title>
        <Text>
          valid for: { timeframeOptions[selected] }
        </Text>
        <CardDivider></CardDivider>
        <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
       {[...Array(stampCount)].map((e, i) => <Icon name='heartbeat' type='font-awesome' color='red' key={i}></Icon>)}
       <Text>{reward}</Text>
        </View>
      </View>
      );
}