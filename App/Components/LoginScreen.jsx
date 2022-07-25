import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, Heading, Box, } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import axios from 'axios';

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
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios
        .get(`https://gwi22-dramaticwire.herokuapp.com/api/user?username=boballen`)
        .then((result => {
            console.log(result);
        }))
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/login`, { email, password })
            .then((result => {
                const status = result.status
                if (status == 200) {

                    auth
                        .signInWithEmailAndPassword(email, password)
                        .then(userCredentials => {
                            const user = userCredentials.user;

                            navigation.navigate('UserProfile')

                        })
                        .catch(error => alert(error.message))
                }

            })).catch(error => console.log(error));
    }

    return (

        <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Box variant='pageTitle' style={{ marginBottom: 3 }}>
                <Heading>Welcome to the{"\n"} Loyalty App!</Heading>
            </Box>

            <Box variant='section'>
                <Text>Email</Text>
                <Input placeholder='Email' value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}></Input>
                <Text>Password</Text>
                <Input w={{
                    base: "85%",
                    md: "25%"
                }} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"} size={17} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" onChangeText={text => setPassword(text)} />
            </Box>
            <Button onPress={handleLogin}>Login</Button>
            <Button style={{ marginTop: 3 }} onPress={() => navigation.navigate('NewUser')}>Sign up</Button>

        </Box >



    );
}