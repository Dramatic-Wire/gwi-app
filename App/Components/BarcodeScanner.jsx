import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Styles/style';
import { Box } from 'native-base';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import UserProfile from './UserProfile';


export default function BarcodeScanner({ navigation }) {
  const { customer_id } = useContext(UserContext);

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
    // setText(data)

    axios
      .get(`https://gwi22-dramaticwire.herokuapp.com/api/LP?id=${data}`)
      .then((result => {
        const LP_id = result.id
        axios
          .post(`https://gwi22-dramaticwire.herokuapp.com/api/add/stamp`, {UserId:LP_id, LPid: customer_id, timestamp:new Date(), redeemed: false})
          .then((result => { 
            console.log(result.data);
            navigation.navigate('UserProfile')
          }))


      })).catch(error => console.log(error));

    console.log('Type: ' + type + '\nData: ' + data)
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
  return (
    <View>
      <Box style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />

      </Box>
      {/* <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View> */}
      <Box variant='section'>

        {/* <Text>{text}</Text> */}
      </Box>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}
