import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, VStack, HStack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function RegisterBusiness(){
    const [category, setCategory] = useState()
    const categortyList = ['Coffee Shop', 'Beauty', 'Resturant', 'Groceries', 'Clothing', 'Health']

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