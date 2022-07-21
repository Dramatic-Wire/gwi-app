import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, VStack, HStack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import axios from 'axios';

export default function NewUser({ navigation }) {
    const [show, setShow] = useState(false);
    // const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState();
    const [first_name, setFirst_name] = useState();
    const [surname, setSurname] = useState();
    const [profile_picture, setProfile_picture] = useState();

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
                    <Input w={{
                    base: "85%",
                    md: "25%"
                }} value={password} onChangeText={value => setPassword(value)} type={show ? "text" : "password"} InputRightElement={<Icon name={show ? "eye" : "eye-slash"}  size={20} mr="2" color="grey" onPress={() => setShow(!show)} />} placeholder="Password" />
                
                <Text>Profile Picture</Text>
                <Input placeholder='Profile Picture' value={profile_picture} onChangeText={value => setProfile_picture(value)}></Input>
            </Box>
            <Button onPress={handleSignUp}>Sign Up</Button>
        </Box>
     );
}