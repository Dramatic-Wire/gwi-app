import { View, } from 'react-native';
import { Button, Input, Text, IconButton, Heading, Box, Select, FlatList, HStack } from "native-base";
import { useState } from 'react';
import styles from '../Styles/style';
import LoyaltyCard from './LoyaltyCard';
import Icon from 'react-native-vector-icons/FontAwesome'
import QRCode from 'react-native-qrcode-svg';

export default function BusinessProfile() {
    const data = [{ name: 'Test', }]
    return (
        <View>
            <Box variant='pageTitle'>
                <Heading style={styles.pageTitle}>George's Coffee Shop</Heading>
            </Box>
            <Box variant='section'>
                <Text variant='section'>You currently have no loyalty programme for your business</Text>
                <Button>Add Loyalty Programme</Button>
            </Box>
            <Box variant='section'>
                <Heading size="sm">Your Loyalty Programme Details</Heading>
                <QRCode
                    value="George's Coffee"
                />
                <Text>125 active members on programme</Text>
                <Text>12 stamps for free item</Text>
                <HStack space={3} justifyContent="center" >
                    <Button >Edit</Button>
                    <Button >Delete</Button>
                </HStack>
            </Box>

        </View >

    );
}