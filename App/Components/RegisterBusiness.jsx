import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, VStack, HStack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

export default function RegisterBusiness() {
    const [category, setCategory] = useState()
    const categortyList = ['Coffee Shop', 'Beauty', 'Resturant', 'Groceries', 'Clothing', 'Health']
    const [businessName, setBusinessName] = useState('');
    const [password, setPassword] = useState('');
    const [logo, setLogo] = useState('');
    const owner_id = 1
    const url = `https://gwi22-dramaticwire.herokuapp.com`
    const registerBusiness = (businessName, owner_id, category, password, logo) => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/register/business`, { businessName, owner_id, category, password, logo})
            .then((result => {
                const results = result.data
                console.log(results.message);
            })).catch(error => console.log(error));
    }

    return (
        <View>
            <Heading>Register a New Business</Heading>
            <Box style={styles.section}>
                <Text>Business Name:</Text>
                <Input placeholder='Business Name' value={businessName} onChangeText={text => setBusinessName(text)}></Input>
                <Text>Business Category</Text>
                <Select selectedValue={category} onValueChange={value => setCategory(value)} placeholder='Choose a Category'>{categortyList.map((category, index) => <Select.Item label={category} value={category} key={index} />)}</Select>
                <Text>Password:</Text>
                <Input placeholder='Password' value={password} onChangeText={text => setPassword(text)}></Input>
                <Text>Business Logo</Text>
                <Input placeholder='Image URL' value={logo} onChangeText={text => setLogo(text)}></Input>
                <Button onPress={() => registerBusiness(businessName, owner_id, category, password, logo)}>Register & Create QR</Button>
            </Box>

        </View>
    return(
        
            <VStack space={3} safeArea='8' >
            <Box variant='pageTitle'>
            <Heading size='md'>Register a New Business</Heading>
            </Box>
                <Box variant='section'>
                <Text variant='section'>Business name</Text>
                <Input placeholder='Business Name'></Input>
                </Box>
                {/* <Box variant='section'>
                <Text variant='section'>Business category</Text>

                <Select selectedValue={category} onValueChange={value => setCategory(value)} placeholder='Choose a Category'>{categortyList.map((category, index) => <Select.Item label={category} value={category} key={index}/> )}</Select>
                </Box> */}
                <Box variant='section'>
                <Text variant='section'>Business category</Text>
                <HStack space={2} flexWrap='wrap'>
          {categortyList.map((business, index) => <Button size={'sm'}  key={business} value={index} onPress={setCategory} variant={business == category ? 'chipSelected' : 'chip'} >{business}</Button>)}
        </HStack>
                </Box>
                <Box variant='section'>
                <Text variant='section'>Business logo</Text>
                <Input placeholder='Image URL'></Input>
                </Box>
                <Button>Save</Button>
            </VStack>
        

    );

}