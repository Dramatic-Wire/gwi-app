import { Button, Input, Text, Heading, Box, KeyboardAvoidingView, Flex, Spacer, useTheme, VStack, FormControl,HStack, Alert } from "native-base";
import { useState, useContext } from 'react';
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth } from '../firebase'
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from "../Contexts/UserContext";
import Logo from "./Icons/Logo";
import AsyncStorageInstance from "../Hooks/AsyncStorage";

export default function ({ navigation }) {
    const { colors } = useTheme()
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});
    const axios = AxiosInstance();

    const [show, setShow] = useState(false);

    const onClose = () => {
      setShow(false)
    }

  
    const { setUserId } = useContext(UserContext);

    const handleLogin = async () => {
        // get token from current user

        // send token to header
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const { email, password } = formData

        await axios.post(`/login`, { email, password }).then(res => {
            const { id } = res.data;
            setUserId(id);
            formData.email = ''
            formData.password = ''
            navigation.navigate('UserProfile');
            // const status = res.status
            // if (status == 200) {

            auth
                .signInWithEmailAndPassword(email, password)
                .then(async userCredentials => {
                    // const token = getIdToken(userCredentials)
                    const user = userCredentials.user
                    // console.log(user)
                    setUserId(id);
                    console.log(await user.getIdToken()) 
                    navigation.navigate('UserProfile');

                })
            //         .catch(error => alert(error.message))
            // }
        }).catch(err => { console.log(err); setErrors({ ...errors, failed: 'login' }) })
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
        <VStack safeArea bg='secondary.500' height='100%' px={3} py={10} space={6} justifyContent='start'>
            <Box height={50} width='100%' mb='5'>
                <Logo fill={colors['primary'][500]} />
            </Box>
            {'failed' in errors && <Heading size={'md'} color='danger.600'>Login failed. Please try again.</Heading>}
            {/* {'failed' in errors && alert('Login failed. Please try again.')} */}
            {/* {'failed' in errors && <Alert w="100%" status='error' >
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      Registration failed. Please try again.
                    </Text>
                  </HStack>
                  <Icon name="triangle-exclamation" variant="unstyled" />
                </HStack>
              </VStack>
            </Alert>} */}

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
            <Button onPress={onSubmit}>Log in</Button>
            <Button style={{ marginTop: 3 }} onPress={() => navigation.navigate('NewUser')}>Sign up</Button>
        </VStack >
    );
}