import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, HStack, useTheme, Stack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import Stamp from './Stamp';
import { auth } from '../firebase'

export default function ({ navigation }) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState()
    const userType = ['Business', 'Individual']
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        // get token from current user
        // const token = await firebase.auth().currentUser.getIdToken();

        // send token to header
       // axios.defaults.headers.common['Authorization'] = `Bearer ${token)}`;



        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
                navigation.navigate('UserProfile')
            })
            .catch(error => alert(error.message))
    }

    return (
        <Box safeArea bg='primary.700' style={{ flex:1 ,alignItems: 'center', justifyContent: 'center'}}>
            <Box variant='pageTitle'>
                <Heading>Welcome to the{"\n"} Loyalty App!</Heading>
            </Box>
            <Box variant='section'>
                {/* <Text>Login as:</Text> */}
                {/* <Select selectedValue={user} onValueChange={value => setUser(value)} placeholder='Select user type'>{userType.map((user, index) => <Select.Item label={user} value={user} key={index}/> )}</Select> */}

                <Text>E-mail</Text>
                <Input placeholder='E-mail' value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}></Input>
                <Text>Password</Text>
                <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"}  size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />
            <Button onPress={handleLogin}>Login</Button>
            <Button onPress={() =>  navigation.navigate('NewUser') }>Sign up for an account</Button>
            </Box>
           

        </Box >

    );
}