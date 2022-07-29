import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Styles/style';
import { Box } from 'native-base';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import UserProfile from './UserProfile';
import AxiosInstance from '../Hooks/AxiosInstance';


export default function BarcodeScanner({ navigation }) {
  const axios = AxiosInstance();
  const { userId, setUpdateStamps } = useContext(UserContext);

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
          .post(`/add/stamp`, {UserId: userId, LPid: data})
          .then(result => { 
            setUpdateStamps(true)
            navigation.navigate('UserProfile')
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
