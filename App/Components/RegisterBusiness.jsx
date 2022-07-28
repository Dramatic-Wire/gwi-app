import { Button, Input, Text, IconButton, Heading, Box, Select, VStack, HStack } from "native-base";
import { useState, useContext } from 'react';
import axios from 'axios';
import BusinessContext from "../Contexts/BusinessContext";
// import UserContext from "../Contexts/UserContext";

export default function RegisterBusiness({ navigation }) {
    const { businessName, setBusinessName, category, setCategory, logo, setLogo } = useContext(BusinessContext)
    // const {customer_id} = useContext(UserContext)
    const categortyList = ['Coffee Shop', 'Beauty', 'Restaurant', 'Groceries', 'Clothing', 'Health']
    const [error, setError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const owner_id = 4 
    const url = `https://gwi22-dramaticwire.herokuapp.com`
    const registerBusiness = () => {
        // get token from current user
        // const token = await firebase.auth().currentUser.getIdToken();

        // send token to header
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (!error && !categoryError) {
            axios
                .post(`https://gwi22-dramaticwire.herokuapp.com/api/register/business`, { businessName, owner_id, category, logo })
                .then((result => {
                    const results = result.data
                    setBusinessID(results.id);
                    navigation.navigate('BusinessProfile')

                })).catch(error => console.log(error));
        }
    }
    const validation = (field, field2) => {
        if (field == '') {
            setError(true)
        }
        if (field2 == undefined) {
            console.log('err')
            setCategoryError(true)
        }
        setTimeout(() => { setError(false) }, 3000);
        setTimeout(() => { setCategoryError(false) }, 3000);

    }

    return (
        <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}  >

                <VStack space={3} safeArea='8' >
                    <Box variant='pageTitle'>
                        <Heading size='md'>Register a New Business</Heading>
                    </Box>
                    <Box variant='section'>
                        <Text variant='section'>Business name</Text>
                        <Input placeholder='Business Name' value={businessName} onChangeText={text => setBusinessName(text)}></Input>
                        {error ? (<Text style={{ color: 'red' }}>Business name required</Text>) : null}
                    </Box>
                    <Box variant='section'>
                        <Text variant='section'>Business category</Text>
                        <HStack space={2} flexWrap='wrap'>
                            {categortyList.map((business, index) => <Button size={'sm'} key={business} value={index} onPress={() => { setCategory(business) }} variant={business == category ? 'chipSelected' : 'chip'} >{business}</Button>)}
                            {categoryError ? (<Text style={{ color: 'red' }}>Business category required</Text>) : null}
                        </HStack>
                    </Box>
                    <Box variant='section'>
                        <Text variant='section'>Business logo</Text>
                        <Input placeholder='Image URL' value={logo} onChangeText={text => setLogo(text)}></Input>
                    </Box>
                    <Button onPress={() => { registerBusiness(); validation(businessName, category) }} >Save</Button>
                </VStack>
            </Box>
        </Box>

    );

}