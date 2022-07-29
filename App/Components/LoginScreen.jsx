import { Button, Input, Text, Heading, Box } from "native-base";
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from "../Contexts/UserContext";

export default function ({ navigation }) {
    const axios = AxiosInstance();

    const [show, setShow] = useState(false);

    const { email, setEmail, password, setPassword, userId } = useContext(UserContext);

    const handleLogin = async () => {
        // get token from current user
        // const token = await firebase.auth().currentUser.getIdToken();

        // send token to header
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.post(`/login`, { email, password }).then(res => {
            const status = res.status
            if (status == 200) {

                auth
                    .signInWithEmailAndPassword(email, password)
                    .then(userCredentials => {
                        const user = userCredentials.user;

                        navigation.navigate('UserProfile')

                    })
                    .catch(error => alert(error.message))
            }
        });
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