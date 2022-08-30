
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {
    Button,
    Input,
    Text,
    Heading,
    Box,
    Flex,
    Spacer,
    useTheme,
    VStack,
    FormControl,
    ScrollView,
} from 'native-base';
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import Logo from './Icons/Logo';
// import { AxiosInstance } from 'axios';
import AxiosInstance from '../Hooks/AxiosInstance';
import Auth from "../Hooks/FirebaseInstance";
import { createUserWithEmailAndPassword } from "firebase/auth";



export default function ({ navigation }) {
    const axios = AxiosInstance();
    const { colors } = useTheme();
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});
    const auth = Auth();
    const [show, setShow] = useState(false);


    const { setEmail } = useContext(UserContext);


    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(userCredentials => {
                const axios = AxiosInstance();
                    const { username, name, surname, email, password } = formData
                    axios
                        .post(`/api/register/user`, { username, first_name: name, surname, email, password })
                        .then((result => {
                            setEmail(result.data.email);
                            navigation.navigate('UserProfile');
                        })).catch(error => console.log(error));
            }).catch(err => { console.log(err); setErrors({ ...errors, failed: 'registration' }) })
    }


    const validate = () => {
        const err = {};
        const fields = ['name', 'surname', 'username', 'email', 'password'];
        let valid = true

        fields.forEach((field) => {
            if (!formData[field]) {
                err[field] = 'This field is required.'
                valid = false
            }
        })

        setErrors({ ...err })
        return valid
    };

    const onSubmit = () => {
        if (validate()) {
            handleSignUp();
            setData('')
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView bg='secondary.500' width="100%" horizontal={false} alwaysBounceHorizontal={false}>

                <VStack
                    safeArea
                    bg='secondary.500'
                    height='100%'
                    px={3}
                    py={10}
                    space={6}
                    justifyContent='flex-start'
                >
                  

                        <Box height={50} width='100%' mb='5'>
                            <Logo fill={colors['primary'][500]} />
                        </Box>
                        {'failed' in errors && <Heading size={'md'} color='danger.600'>Registration failed. Please try again.</Heading>}
                        <VStack variant='section' space={3} py={5}>
                            <FormControl isRequired isInvalid={'name' in errors}>
                                <FormControl.Label
                                    _text={{
                                        bold: true,
                                        fontSize: 'lg',
                                    }}
                                >
                                    Name
                                </FormControl.Label>
                                <Input
                                    placeholder='Sally'
                                    onChangeText={(value) => setData({ ...formData, name: value })}
                                />
                                {'name' in errors && (
                                    <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={'surname' in errors}>
                                <FormControl.Label
                                    _text={{
                                        bold: true,
                                        fontSize: 'lg',
                                    }}
                                >
                                    Surname
                                </FormControl.Label>
                                <Input
                                    placeholder='Salamandar'
                                    onChangeText={(value) => setData({ ...formData, surname: value })}
                                />
                                {'surname' in errors && (
                                    <FormControl.ErrorMessage>{errors.surname}</FormControl.ErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={'username' in errors}>
                                <FormControl.Label
                                    _text={{
                                        bold: true,
                                        fontSize: 'lg',
                                    }}
                                >
                                    Username
                                </FormControl.Label>
                                <Input
                                    placeholder='sallythesalamandar'
                                    onChangeText={(value) => setData({ ...formData, username: value })}
                                />
                                {'username' in errors && (
                                    <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={'email' in errors}>
                                <FormControl.Label
                                    _text={{
                                        bold: true,
                                        fontSize: 'lg',
                                    }}
                                >
                                    Email
                                </FormControl.Label>
                                <Input
                                    placeholder='stamp@stampede.com'
                                    onChangeText={(value) => setData({ ...formData, email: value })}
                                />
                                {'email' in errors && (
                                    <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={'password' in errors}>
                                <FormControl.Label
                                    _text={{
                                        bold: true,
                                        fontSize: 'lg',
                                    }}
                                >
                                    Password
                                </FormControl.Label>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    InputRightElement={
                                        <Icon
                                            name={show ? 'eye' : 'eye-slash'}
                                            size={17}
                                            mr='2'
                                            color='grey'
                                            onPress={() => setShow(!show)}
                                        />
                                    }
                                    onChangeText={(value) =>
                                        setData({
                                            ...formData,
                                            password: value,
                                        })
                                    }
                                />
                                {'password' in errors && (
                                    <FormControl.ErrorMessage>
                                        {errors.password}
                                    </FormControl.ErrorMessage>
                                )}
                            </FormControl>
                        </VStack>
                    <Button onPress={onSubmit}> Sign up</Button>
                    <Button onPress={() => navigation.navigate('LoginScreen')}>Back to log in</Button>

                </VStack>
                        </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}