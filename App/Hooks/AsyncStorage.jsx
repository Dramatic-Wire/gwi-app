import AsyncStorage from '@react-native-async-storage/async-storage';

function AsyncStorageInstance() {

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        // value previously stored
        console.log(value)
      }
    } catch (e) {
      // error reading value
    }
  }
  return {
    storeData,
    getData
  }
}
export default AsyncStorageInstance;
