import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'

export default function NewUser({ navigation }) {
    const [show, setShow] = useState(false);
    // const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
                navigation.navigate('LoginScreen')

            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <Heading>Create an account</Heading>
            <Box style={styles.section}>
                <Text>Name</Text>
                <Input placeholder='Name'></Input>
                <Text>Surname</Text>
                <Input placeholder='Surname'></Input>
                <Text>Username</Text>
                <Input placeholder='Username'></Input>
                <Text>E-mail</Text>
                <Input placeholder='E-mail' value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}></Input>
                <Text>Password</Text>
                <Input type={show ? "text" : "password"} InputRightElement={<IconButton icon={<Icon name={show ? "eye" : "eye-slash"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" onChangeText={text => setPassword(text)} />
            </Box>
            <Button onPress={handleSignUp}>Sign Up</Button>
        </View>

    );
}