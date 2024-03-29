import { Button, Input, Text, Heading, Box, KeyboardAvoidingView, Flex, Spacer, useTheme, VStack, FormControl } from "native-base";
import { useState, useContext, useEffect } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from "../Contexts/UserContext";
import Logo from "./Icons/Logo";
import { Alert } from "react-native";
import Auth from "../Hooks/FirebaseInstance";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function ({ navigation }) {
    const { setUserId, userCredentials, setEmail, email  } = useContext(UserContext);
    const { colors } = useTheme()
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});
    const axios = AxiosInstance();
    const auth = Auth();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email);
            navigation.navigate('UserProfile');
        }
    }, [auth.currentUser])

   
    const handleLogin = async () => {
        const { email, password } = formData
        // console.log(email)
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                setEmail(user.email);
                navigation.navigate('UserProfile');
                setData('')
                
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const validate = () => {
        const err = { ...errors }
        delete err.email
        delete err.password
        if (!formData.email) {
            err.email = 'Email is required'
        }

        if (!formData.password) {
            err.password = 'Password is required'
        }

        if (!formData.email || !formData.password) {
            setErrors({ ...err })
            return false;
        } else {
            return true;
        }
    };

    const onSubmit = () => {
        console.log(formData)
        if (validate()) { handleLogin() };
        console.log(errors)
    };

    return (
        <VStack safeArea bg='#b8dbbb' height='100%' px={3} py={10} space={6} justifyContent='flex-start'>
            <Box height={50} width='100%' mb='5'>
                <Logo fill={'#ffff4f'} />
            </Box>
            {'failed' in errors && <Heading size={'md'} color='danger.600'>Login failed. Please try again.</Heading>}


            <VStack variant='section' space={10} py={5}>

                <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label _text={{
                        bold: true,
                        fontSize: 'lg',
                    }}>Email</FormControl.Label>
                    <Input placeholder="stamp@stampede.com" value={formData.email} onChangeText={value => setData({
                        ...formData,
                        email: value
                    })} />
                    {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
                </FormControl>



                <FormControl isRequired isInvalid={'password' in errors}>
                    <FormControl.Label _text={{
                        bold: true,
                        fontSize: 'lg'
                    }}>Password</FormControl.Label>
                    <Input type={show ? "text" : "password"} value={formData.password} InputRightElement={<Icon name={show ? "eye" : "eye-slash"} size={17} mr="2" color="grey" onPress={() => setShow(!show)} />} onChangeText={value => setData({
                        ...formData,
                        password: value
                    })} />
                    {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
                </FormControl>

            </VStack>
            <Button onPress={onSubmit}  variant={'subtle'} >Log in</Button>
            <Button style={{ marginTop: 3 }} onPress={() => navigation.navigate('NewUser')} variant={'subtle'}>Sign up</Button>
        </VStack >
    );
}