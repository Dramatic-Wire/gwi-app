import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function NewUser() {
    const [show, setShow] = useState(false);
    return (
        <View>
            <Heading>Register a new User</Heading>
            <Box style={styles.section}>
                <Text>Name:</Text>
                <Input placeholder='name'></Input>
                <Text>Surname:</Text>
                <Input placeholder='surname'></Input>
                <Text>Username:</Text>
                <Input placeholder='Username'></Input>
                <Text>E-mail:</Text>
                <Input placeholder='E-mail'></Input>
                <Text>Password</Text>
                <Input type={show ? "text" : "password"} InputRightElement={<IconButton icon={<Icon name={show ? "eye" : "eye-slash"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" />
            </Box>
            
            <Button>Create Account</Button>

        </View>

    );
}