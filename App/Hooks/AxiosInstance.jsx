import axios from 'axios';
import { DATABASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "../Hooks/FirebaseInstance";

function AxiosInstance() {
  const auth = Auth();
  // const accessToken = await AsyncStorage.getItem('token')
  if (auth.currentUser == undefined) return null
  const axiosInstance = axios.create({
    baseURL: `${DATABASE_URL}`,
    headers: {
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
      uid: auth.currentUser.uid,
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });

  // axiosInstance.interceptors.response.use(
  //   (res) => {
  //     return res;
  //   }, async (err) => {
  //     const originalConfig = err.config;
  //     console.log(originalConfig)
  //     if (originalConfig.url !== '/api/login' && err.response) {
  //       if ((err.response.status == 401 || err.response.status == 403) && !originalConfig._retry) {
  //         originalConfig._retry = true;
  //         try {
  //           const refresh = await axiosInstance.post('/api/refresh', {
  //             refreshToken: user.refreshToken,
  //           });
  //           const { accessToken } = refresh.data;
  //           user = { ...user, accessToken: accessToken },

  //             localStorage.setItem("user", JSON.stringify({ ...user, accessToken: accessToken }))
  //           originalConfig.headers.Authorization = `Bearer ${accessToken}`
  //           return axiosInstance(originalConfig);
  //         } catch (_error) {
  //           localStorage.clear()
  //           return Promise.reject(_error);
  //         }
  //       }
  //     } 
  //     localStorage.clear()
  //     return Promise.reject(err)
  //   }
  // )

  return axiosInstance;
}

export default AxiosInstance;