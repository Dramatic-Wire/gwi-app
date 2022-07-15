import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, HStack, useTheme, Stack} from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import Stamp from './Stamp';

export default function () {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState()
    const userType = ['Business', 'Individual']
    return (
        <View>
            <Box variant='pageTitle'>
                <Heading>Welcome to the{"\n"} Loyalty App!</Heading>
            </Box>
            <Box variant='section'>
                <Text>Login as:</Text>
                <Select selectedValue={user} onValueChange={value => setUser(value)} placeholder='Select user type'>{userType.map((user, index) => <Select.Item label={user} value={user} key={index}/> )}</Select>

                <Text>Name</Text>
                <Input InputLeftElement={<IconButton icon={<Icon name="user" />} size={5} ml="2" color="muted.400" />} placeholder="Name" />
                <Text>Password</Text>
                <Input type={show ? "text" : "password"} InputRightElement={<IconButton icon={<Icon name={show ? "eye" : "eye-slash"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" />

            </Box>

            <Button>Login</Button>

        </View>

    );
}