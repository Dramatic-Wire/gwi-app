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

  useEffect(() => {
    const getUserInfo = async () => {
      await axios.get(`/api/user?email=${email}`).then(res => {
        console.log(res.data)
        setFirst_name(result.data.first_name);
        setCustomer_Id(result.data.id)
      })
    }
    if (email > 0) {
      getUserInfo()
    }
  }, [email])

  // customerName = 'Sylvia', validFor = '1 month', stampCount = 5, stamped = 2, reward = '1 free item'

  return (
    <UserContext.Provider
      value={{
        email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture, customer_id, setCustomer_Id
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;