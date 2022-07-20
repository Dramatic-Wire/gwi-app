import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, HStack, useTheme, Stack} from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import Stamp from './Stamp';
import axios from 'axios';

export default function () {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState()
    const userType = ['Business', 'Individual']
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const logInUser = (username, password) => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/login`, { username, password })
            .then((result => {
                const results = result.data
                console.log(result.data);
                console.log(result.data.result);

            })).catch(error => console.log(error));
    }
    return (
        <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center', }}>
            <Box variant='pageTitle'>
                <Heading>Welcome to the{"\n"} Loyalty App!</Heading>
            </Box>
            <Box variant='section'>
                {/* <Text>Login as:</Text> */}
                {/* <Select selectedValue={user} onValueChange={value => setUser(value)} placeholder='Select user type'>{userType.map((user, index) => <Select.Item label={user} value={user} key={index}/> )}</Select> */}

                <Text>Username</Text>
                <Input value={username} onChangeText={value => setUsername(value)} InputLeftElement={<Icon name="user" size={14} mr="2" color="grey"  />} placeholder="Username" />
                <Text>Password</Text>
                <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"}  size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />

            </Box>

            <Button onPress={() =>  logInUser(username, password) } >Login</Button>

        </Box>

    );
}