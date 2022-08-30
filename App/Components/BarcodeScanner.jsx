import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Styles/style';
import { Box } from 'native-base';
import UserContext from '../Contexts/UserContext';
import AxiosInstance from '../Hooks/AxiosInstance';
import socket from '../Hooks/Socket';

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
      .post(`/api/add/stamp`, { UserId: userId, LPid: data })
      .then(result => {
        if (result.status == 201) {
          setUpdateStamps(true);
          socket.emit("new stamp", {LP_id: data})
          navigation.navigate('Success')
        }
        else {
          navigation.navigate('Error')
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
  return (
    <Box safeArea bg='primary.800' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Box style={styles.barcodebox} w='90%' height='60%'>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: '100%', width: '100%' }} />


      </Box>

      {/* {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />} */}
    </Box>
  );
}
