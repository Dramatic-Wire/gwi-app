import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, Heading, Box, } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
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
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                axios
                    .post(`https://gwi22-dramaticwire.herokuapp.com/login`, { email, password })
                    .then((result => {
                        const results = result.data
                        if (results.message == 'logged in'){
                            navigation.navigate('UserProfile')
                        }
        
                    })).catch(error => console.log(error));
            })
            .catch(error => alert(error.message))
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