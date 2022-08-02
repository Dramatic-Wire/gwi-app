import { Button, Input, Text, Heading, Box, KeyboardAvoidingView, Flex, Spacer } from "native-base";
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from "../Contexts/UserContext";

export default function ({ navigation }) {
    const axios = AxiosInstance();

    const [show, setShow] = useState(false);

    const { email, setEmail, password, setPassword, userId, setUserId } = useContext(UserContext);

    const handleLogin = async () => {
        // get token from current user
        // const token = await firebase.auth().currentUser.getIdToken();

        // send token to header
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.post(`/login`, { email, password }).then(res => {

            const { id } = res.data;
            setUserId(id);
            setEmail('')
            setPassword('')
            navigation.navigate('UserProfile');
            // const status = res.status
            // if (status == 200) {

            //     auth
            //         .signInWithEmailAndPassword(email, password)
            //         .then(userCredentials => {
            //             console.log(userCredentials)
            //             const user = userCredentials.user;
            //             navigation.navigate('UserProfile')

            //         })
            //         .catch(error => alert(error.message))
            // }
        });
    }

    return (
        <Flex safeArea bg='primary.700' height={'100%'} alignItems='center' paddingTop='10'>
            <KeyboardAvoidingView h={{
        base: "400px",
        lg: "auto"
            }} width='80%' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Box variant='pageTitle' style={{ marginBottom: 3 }}>
                <Heading>Welcome to{"\n"} Stampede!</Heading>
                </Box>
            <Spacer/>
            <Box variant='section'>
                <Text>Email</Text>
                <Input placeholder='Email' value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input} />
                <Text>Password</Text>
                <Input type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"} size={17} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" value={password} onChangeText={text => setPassword(text)} style={styles.input}/>
            </Box>
                    <Spacer/>
            <Button onPress={handleLogin}>Login</Button>
                    <Spacer/>
            <Button style={{ marginTop: 3 }} onPress={() => navigation.navigate('NewUser')}>Sign up</Button>
            </KeyboardAvoidingView>
            </Flex >
            );
}