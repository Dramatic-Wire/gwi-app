import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function NewBusiness(){
    const [category, setCategory] = useState()
    const categortyList = ['Coffee Shop', 'Beauty', 'Resturant', 'Groceries', 'Clothing', 'Health']

    return(
        <View>
            <Heading>Register a New Business</Heading>
            <Box style={styles.section}>
                <Text>Business Name:</Text>
                <Input placeholder='Business Name'></Input>
                <Text>Business Category</Text>
                <Select selectedValue={category} onValueChange={value => setCategory(value)} placeholder='Choose a Category'>{categortyList.map((category, index) => <Select.Item label={category} value={category} key={index}/> )}</Select>
                <Text>Business Logo</Text>
                <Input placeholder='Image URL'></Input>
                <Button>Register & Create QR</Button>
            </Box>
        
        </View>

    );

}