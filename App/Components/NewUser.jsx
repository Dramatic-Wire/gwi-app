import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, VStack, HStack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

export default function NewUser() {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState();
    const [first_name, setFirst_name] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [profile_picture, setProfile_picture] = useState();
    const registerUser = (username, first_name, surname, email, password, profile_picture) => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/register/user`, { username, first_name, surname, email, password, profile_picture })
            .then((result => {
                const results = result.data
                console.log(result.data.result);

            })).catch(error => console.log(error));
    }
    

    return (
        <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}>
            <Box variant='pageTitle'>
               <Heading>Register a user</Heading> 
            </Box>
            
            <Box variant='section'>
                <Text>Username:</Text>
                <Input placeholder='Username' value={username} onChangeText={value => setUsername(value)}></Input>
                <Text>First Name:</Text>
                <Input placeholder='First Name' value={first_name} onChangeText={value => setFirst_name(value)}></Input>
                <Text>Surname:</Text>
                <Input placeholder='Surname' value={surname} onChangeText={value => setSurname(value)}></Input>
                <Text>E-mail:</Text>
                <Input placeholder='E-mail' value={email} onChangeText={value => setEmail(value)}></Input>
                <Text>Password</Text>
                 <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"}  size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />
                {/* <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<IconButton icon={<Icon name={show ? "eye" : "eye-slash"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" /> */}
                <Text>Profile Picutre:</Text>
                <Input placeholder='profile pic' value={profile_picture} onChangeText={value => setProfile_picture(value)}></Input>
            </Box>
            
            <Button onPress={() =>  registerUser(username, first_name, surname, email, password, profile_picture) } >Create Account</Button>

        </Box>

    );
}