import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Styles/style';
import { Box, useTheme } from 'native-base';
import UserContext from '../Contexts/UserContext';
import BusinessContext from '../Contexts/BusinessContext';
import UserProfile from './UserProfile';
import AxiosInstance from '../Hooks/AxiosInstance';
import Loading from './Loading';


export default function RewardScanner({ navigation }) {
  const axios = AxiosInstance();
//   const { userId } = useContext(UserContext);
  const { LP_id,  } = useContext(BusinessContext);
  const { colors } = useTheme();

  const [hasPermission, setHasPermission] = useState(null); 
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    const parseData = JSON.parse(data)
   
   
    axios
    .post(`/api/LP/redeem/${parseData.customer_id}/${parseData.lp_id}`)
    .then(result => {
        if (result.status == 200) {
            navigation.navigate('RewardSuccess')
        }
        else {
          navigation.navigate('RewardError')
        }
      }).catch(error => console.log(error));
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View variant='section'>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View variant='section'>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  if (scanned == true) return (<Loading></Loading>);
  return (
    <Box safeArea bg={colors.primary['200']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Box style={styles.barcodebox} w='90%' height='60%'>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: '100%', width: '100%' }} />


      </Box>

      {/* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
    </Box>
  );
}
