import { useTheme, Box, Text, Heading, VStack, Badge } from 'native-base';
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";
import CoffeeShop from "./Icons/CoffeeShop"
import axios from 'axios';
import UserContext from '../Contexts/UserContext';


export default function CardIcon({ card, color = 'violet' }) {
  // stampCount = 10, reward = '20% off', name = "Fiona's Fashions", stamped = 2, color = 'emerald', category = 'Clothing'
  const { colors } = useTheme();
  const { stampsneeded, stamps, business_name } = card

  return (
    <VStack margin={3} alignItems="center" justifyContent="flex-end">
      {Number(stamps) >= Number(stampsneeded) && <Badge // bg="red.400"
        bgColor={'secondary.400'} rounded="full" mb={-3} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          color: 'black',
          fontSize: 12
        }}>
        Reward!
      </Badge>}
      {Number(stampsneeded) - Number(stamps) == 1 && <Badge // bg="red.400"
        bgColor={'tertiary.300'} rounded="full" mb={-3} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          color: 'black',
          fontSize: 12
        }}>
        1 to go!
      </Badge>}
      <VStack>
        <Box rounded='lg' bgColor={`${color}.200`} p={4} width={90} height={100}>
          {card.category == 'Coffee Shop' && <CoffeeShop fill={colors[color]['400']} stroke={colors[color]['700']} />}
          {card.category == 'Beauty' && <Beauty fill={colors[color]['400']} stroke={colors[color]['700']} />}
          {card.category == 'Resturant' && <Resturant fill={colors[color]['400']} stroke={colors[color]['700']} />}
          {card.category == 'Groceries' && <Groceries fill={colors[color]['400']} stroke={colors[color]['700']} />}
          {card.category == 'Clothing' && <Clothing fill={colors[color]['400']} stroke={colors[color]['700']} />}
          {card.category == 'Health' && <Health fill={colors[color]['400']} stroke={colors[color]['700']} />}
        </Box>
      </VStack>
      <Heading size='sm' margin={2} color={'white'}>{business_name}</Heading>
    </VStack>
  );
}