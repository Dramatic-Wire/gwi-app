import { View, useState } from 'react-native';
import { Modal, IconButton, useTheme, Box, Text, Heading, HStack } from 'native-base';
import styles from '../Styles/style';
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";


export default function CardIcon({ stampCount = 10, reward = '20% off', name = "Fiona's Fashions", stamped = 2, color = 'emerald', category = 'Clothing' }) {
const { colors } = useTheme();
  return (
    <Box width='100%' bgColor={`${color}.300`} rounded='lg' p="3" m='3' shadow='5'>
      <Heading size='md' textAlign={'left'}>{name}</Heading>
      <HStack  justifyContent="left" alignItems="center">

       <Box variant={stamped ? 'stamped' : 'unstamped'} bgColor={stamped ? `${color}.100` : 'muted.500'} p='2'>
       {category == 'Coffee Shop' && <CoffeeShop fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Beauty' && <Beauty fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Resturant' && <Resturant fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Groceries' && <Groceries fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Clothing' && <Clothing fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Health' && <Health fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
    </Box>
         
        <Text width='75%' fontSize='lg'>{`Collect ${stampCount - stamped} more stamps to get `} 
        <Text bold>
          {reward}
            </Text>
        </Text>    
      </HStack>
      </Box>
      );
}