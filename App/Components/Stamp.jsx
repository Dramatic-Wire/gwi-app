import { View, Text, Image } from "react-native";
import { Box } from 'native-base'



export default function Stamp({stamped = false}) {

  return (
    <Box variant={stamped ? 'stamped':'unstamped'}>
      <Image style={{resizeMode:'contain', width:40, height:40, tintColor: stamped ? undefined : '#a3a3a3' }} source={require('../Imgs/coffee-stamp.png')}/>
    </Box>
  )
}