import { useTheme, Box, Text, Heading, HStack } from 'native-base';
import { useState, useContext } from 'react';
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";
import axios from 'axios';
import UserContext from '../Contexts/UserContext';


export default function CardIcon({ color = 'emerald' }) {
  // stampCount = 10, reward = '20% off', name = "Fiona's Fashions", stamped = 2, color = 'emerald', category = 'Clothing'
  const { colors } = useTheme();
  const [stampCount, setStampCount] = useState();
  const [reward, setReward] = useState();
  const [name, setName] = useState();
  const [stamped, setStamped] = useState();
  const [category, setCategory] = useState();
  const { customer_id } = useContext(UserContext);

  axios
    .get(`https://gwi22-dramaticwire.herokuapp.com/api/stamps?customer_id=${customer_id}`)
    .then((result => {

      setStampCount(result.data.stamps)
      setReward(result.data.reward)
      setName(result.data.business_name)
      setStamped(result.data.length)
      setCategory(result.data.category)

    })).catch(error => console.log(error));

  return (
    <Box bgColor={`${color}.300`} rounded='lg' p="3" shadow='5'>
      <HStack justifyContent="left" alignItems="start">

        <Box variant={stamped ? 'stamped' : 'unstamped'} bgColor={stamped ? `${color}.100` : 'muted.500'} p='2'>
          {category == 'Coffee Shop' && <CoffeeShop fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Beauty' && <Beauty fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Resturant' && <Resturant fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Groceries' && <Groceries fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Clothing' && <Clothing fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
          {category == 'Health' && <Health fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']} />}
        </Box>
        <Box width='75%' >
          <Heading size='md' textAlign={'left'}>{name}</Heading>
          <Text fontSize='lg'>{`Collect ${stampCount - stamped} more stamps to get `}
            <Text bold>
              {reward}
            </Text>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}