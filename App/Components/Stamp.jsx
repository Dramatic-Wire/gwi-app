import { useContext } from "react";
import { Box, useTheme } from 'native-base'
import CoffeeShop from "./Icons/CoffeeShop";
import Beauty from "./Icons/Beauty";
import Resturant from "./Icons/Restaurant";
import Health from "./Icons/Health";
import Clothing from "./Icons/Clothing";
import Groceries from "./Icons/Groceries";
import BusinessContext from '../Contexts/BusinessContext'


export default function Stamp({ stamped = false, color, LPCategory }) {
  const { category } = useContext(BusinessContext);
  const { colors } = useTheme();
  
  

  return (
    <Box variant={stamped ? 'stamped' : 'unstamped'} bgColor={stamped ? `${color}.100` : 'muted.500'} p='2'>
       {(LPCategory == 'Coffee Shop' || category == 'Coffee Shop') && <CoffeeShop fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {(LPCategory == 'Beauty' || category == 'Beauty')  && <Beauty fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {(LPCategory == 'Resturant' || category == 'Resturant')  && <Resturant fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {(LPCategory == 'Groceries' || category == 'Groceries') && <Groceries fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {(LPCategory == 'Clothing' || category == 'Clothing') && <Clothing fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
       {(LPCategory == 'Health' || category == 'Health') && <Health fill={stamped ? colors[color]['400'] : colors['muted']['500']} stroke={stamped ? colors[color]['700'] : colors['muted']['700']}/>}
    </Box>
  )
}