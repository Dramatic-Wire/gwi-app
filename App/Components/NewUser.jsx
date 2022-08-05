import { Button, Input, Text, Heading, Box, Flex, KeyboardAvoidingView } from "native-base";
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import UserContext from "../Contexts/UserContext";
import AxiosInstance from "../Hooks/AxiosInstance";



export default function NewUser({ navigation }) {
    const axios = AxiosInstance();
    const { password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture } = useContext(UserContext);

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');


    const registerUser = async () => {
        await axios.post(`/register/user`, { username, first_name, surname, email, password, profile_picture }).then(res => {
        }).catch(error => console.log(error));
    }
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
                registerUser()

                setSurname()
                setEmail()
                setPassword()
                setUsername()
                setProfile_picture()
                navigation.navigate('LoginScreen')
            })
            .catch(error => alert(error.message))
    }
    return (
        <Flex safeArea bg='primary.700' height={'100%'} alignItems='center' paddingTop='10'>
            {/* <KeyboardAvoidingView h={{
                base: "400px",
                lg: "auto"
            }} width='80%' behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
                <Box style={{ marginBottom: '2%' }} variant='pageTitle'>
                    <Heading >Create an account</Heading>
                </Box>

                <Box variant='section'>
                    <Text>Name</Text>
                    <Input placeholder='Name' value={first_name}
                        onChangeText={text => setFirst_name(text)}></Input>
                    <Text>Surname</Text>
                    <Input placeholder='Surname' value={surname}
                        onChangeText={text => setSurname(text)}></Input>
                    <Text>Username</Text>
                    <Input placeholder='Username' value={username}
                        onChangeText={text => setUsername(text)}></Input>
                    <Text>Email</Text>
                    <Input placeholder='Email' value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}></Input>
                    <Text>Password</Text>
                    <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"} size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />

                    <Text>Profile Picture</Text>
                    <Input placeholder='Profile Picture' value={profile_picture} onChangeText={value => setProfile_picture(value)}></Input>
                </Box>
                <Button style={{ marginTop: '2%' }} onPress={handleSignUp}>Sign Up</Button>
            {/* </KeyboardAvoidingView> */}
        </Flex>
    );
}