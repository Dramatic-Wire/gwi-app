import { useContext } from "react";
import { Box, useTheme } from 'native-base'
import CoffeeShop from "./Icons/CoffeeShop";
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";
import BusinessContext from '../Contexts/BusinessContext'


export default function Stamp({ stamped = false, color }) {
  const { category } = useContext(BusinessContext);
  const categortyList = ['Coffee Shop', 'Beauty', 'Resturant', 'Groceries', 'Clothing', 'Health']
  const { colors } = useTheme();


  return (
    <Box variant={stamped ? 'stamped' : 'unstamped'} bgColor={stamped ? `${color}.100` : 'muted.500'} p='2'>
       {category == 'Coffee Shop' && <CoffeeShop fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Beauty' && <Beauty fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Resturant' && <Resturant fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Groceries' && <Groceries fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Clothing' && <Clothing fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {category == 'Health' && <Health fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
    </Box>
  )
}