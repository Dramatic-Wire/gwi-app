import { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const axios = AxiosInstance();
  const [email, setEmail] = useState();
  const [first_name, setFirst_name] = useState();
  const [surname, setSurname] = useState();
  const [userId, setUserId] = useState();
  const [LP, setLP] = useState();
  const [updateStamps, setUpdateStamps] = useState(false);
  const [focusLP, setFocusLP] = useState();




  useEffect(() => {
    const getUser = async () => {
      console.log('email')
      console.log(email)
      await axios.get(`/user?email=${email}`).then(res => {
        console.log(res.data)
        const { first_name, id, surname,} = res.data
        setUserId(id);
        setFirst_name(first_name);
        setSurname(surname);
      }).catch(e => console.log(e))
    }

    if (email !== undefined && (userId == 0 || !userId)) {   
        getUser();
    }

  }, [email])


  useEffect(() => {
    const getUser = async () => {
      await axios.get(`/user?user_id=${62}`).then(res => {
        console.log(res.data)
        const { first_name, profile_picture, surname, username } = res.data
       
        setFirst_name(first_name);
        setSurname(surname);
       
      })
    }
    if (userId == 0 || !userId) {
      setFirst_name();
      setSurname();
    } else {
      //getUser();
      setUpdateStamps(true)
    }
  }, [userId])

  useEffect(() => {
    const getUserStamps = async () => {
      if (userId > 0) {
        await axios.get(`/stamps?customer_id=${userId}`).then(res => {
          setLP(res.data)
        })
      }
    }

    if (updateStamps) {
      getUserStamps()
      setUpdateStamps(false)
    }

  }, [updateStamps])

  return (
    <UserContext.Provider
      value={{
        setEmail, first_name, setFirst_name,
        surname, setSurname, userId, setUserId, LP, setLP, setUpdateStamps,
        focusLP, setFocusLP
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;