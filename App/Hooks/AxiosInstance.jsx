import { useState, useEffect } from 'react'
import axios from 'axios';
import { DATABASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from "../Hooks/FirebaseInstance";

import io from 'socket.io-client';

const auth = Auth();
const socket = io('https://gwi22-dramaticwire.herokuapp.com/api', {extraHeaders:{ Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
  uid: auth.currentUser.uid,
}
});

function AxiosInstance() {
  // const accessToken = await AsyncStorage.getItem('token')
  if (auth.currentUser == undefined) return null
  
  
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    if(auth.currentUser !== undefined) {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };}
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };


  const axiosInstance = axios.create({
    baseURL: DATABASE_URL,
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