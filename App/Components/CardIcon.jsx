import { useTheme, Box, Text, Heading, HStack } from 'native-base';
import { useState, useContext } from 'react';
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

        {/* <Box variant={stamped ? 'stamped' : 'unstamped'} bgColor={stamped ? `${color}.100` : 'muted.500'} p='2'>
          {category == 'Coffee Shop' && <CoffeeShop fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Beauty' && <Beauty fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Resturant' && <Resturant fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Groceries' && <Groceries fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Clothing' && <Clothing fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Health' && <Health fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
        </Box> */}
        <Box width='75%' >
          <Heading size='md' textAlign={'left'}>{card.business_name}</Heading>
          <Text fontSize='lg'>{`Collect ${card.stampsneeded - card.stamped} more stamps to get `}
            <Text bold>
              {card.reward}
            </Text>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}