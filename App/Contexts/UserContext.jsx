import { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const axios = AxiosInstance();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState();
  const [first_name, setFirst_name] = useState();
  const [surname, setSurname] = useState();
  const [profile_picture, setProfile_picture] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      await axios.get(`/api/user?username=${username}`).then(res => {
        console.log(res.data)
      })
    }
    if (username > 0) {
      getUserInfo()
    } 
  },[username])

  // customerName = 'Sylvia', validFor = '1 month', stampCount = 5, stamped = 2, reward = '1 free item'

  return (
    <UserContext.Provider
      value={{
        email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;