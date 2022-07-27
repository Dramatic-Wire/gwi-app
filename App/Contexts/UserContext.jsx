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
  const [customer_id, setCustomer_Id] = useState();
  let LP
  
  useEffect(() => {
    const getUserInfo = async () => {
      await axios.get(`/api/user?email=${email}`).then(res => {
        console.log(res.data)

      })
      await axios.get(`/stamps?customer_id=${customer_id}`).then((res => {

        LP = res.data

      })).catch(error => console.log(error))
    }
    if (email > 0) {
      getUserInfo()
    }
  }, [email])

  return (
    <UserContext.Provider
      value={{
        email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture, customer_id, setCustomer_Id, LP
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;