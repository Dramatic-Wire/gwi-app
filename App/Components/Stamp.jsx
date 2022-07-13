import { View, Text, Image } from "react-native";



export default function Stamp() {
  return (
    <View style={{backgroundColor: 'hsl(34, 72%, 94%)', width:60, height:60, margin:10, alignItems:'center', justifyContent:'center', borderRadius:10, shadowColor:'black', shadowOffset:{width: 5, height:5}, shadowRadius:4 , shadowOpacity: 0.3, }}>
      <Image style={{resizeMode:'contain', width:40, height:40}} source={require('../Imgs/coffee-stamp.png')}/>
    </View>
  )
}