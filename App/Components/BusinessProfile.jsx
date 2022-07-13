import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function BusinessProfile(){
    return(
        <View>
            <Box>
                <Heading>Business Name</Heading>
                <Text>Loyalty Programme Details</Text>
            </Box>
        </View>

    );
}