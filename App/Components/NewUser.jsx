import { Button, Input, Text,  Heading, Box, } from "native-base";
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import axios from 'axios';
import UserContext from "../Contexts/UserContext";


export default function NewUser({ navigation }) {
 const { email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture } = useContext(UserContext);

    const [show, setShow] = useState(false);
    

    const registerUser = () => {
        axios
            .post(`https://gwi22-dramaticwire.herokuapp.com/api/register/user`, { username, first_name, surname, email, password, profile_picture })
            .then((result => {
                const results = result.data
                console.log(result.data.result);

            })).catch(error => console.log(error));
    }
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
                registerUser()
                navigation.navigate('LoginScreen')

            })
            .catch(error => alert(error.message))
    }
    return (
        <Box safeArea bg='primary.700' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Box variant='pageTitle'>
                <Heading>Create an account</Heading>
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
                    <Input value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"}  size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />
                
                <Text>Profile Picture</Text>
                <Input placeholder='Profile Picture' value={profile_picture} onChangeText={value => setProfile_picture(value)}></Input>
            </Box>
            <Button onPress={handleSignUp}>Sign Up</Button>
        </Box>
     );
}