import { useTheme, Box, Text, Heading, HStack } from 'native-base';
import { useState, useContext, useEffect } from 'react';
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";
import axios from 'axios';
import UserContext from '../Contexts/UserContext';


export default function CardIcon({ card, color = 'emerald' }) {
  // stampCount = 10, reward = '20% off', name = "Fiona's Fashions", stamped = 2, color = 'emerald', category = 'Clothing'
  const { colors } = useTheme();
  
  return (
    <Box bgColor={`${color}.300`} rounded='lg' p="3" shadow='5'>
      <HStack justifyContent="left" alignItems="start">

        <Box variant={`stamped`} bgColor={`${color}.100`} p='2'>
          {card.category == 'Coffee Shop' && <CoffeeShop fill={colors[color]['400'] }/>}
          {card.category == 'Beauty' && <Beauty fill={colors[color]['400']}/>}
          {card.category == 'Resturant' && <Resturant fill={colors[color]['400']} />}
          {card.category == 'Groceries' && <Groceries fill={colors[color]['400']} />}
          {card.category == 'Clothing' && <Clothing fill={colors[color]['400']} />}
          {card.category == 'Health' && <Health fill={colors[color]['400']} />}
        </Box>
        <Box width='75%' >
          <Heading size='md' textAlign={'left'}>{card.business_name}</Heading>
          <Text fontSize='lg'>{`Collect ${card.stampsneeded - card.stamps} more stamps to get `}
            <Text bold>
              {card.reward}
            </Text>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}