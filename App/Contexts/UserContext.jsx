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
  const [user_id, setCustomer_Id] = useState();
  const [LP, setLP] = useState();

  useEffect(() => {

    if (id == 0 || !id) {

    } else {
      await axios.get(`/user?user_id=${id}`).then(res => {
        setFirst_name(res.data.first_name)
      })
    }

  }, [id])

  useEffect(() => {
    if (id > 0) {
      await axios.get(`/stamps?customer_id=${id}`).then(res => {
        setLP(res.data)
      })
    }
  }, [id])

  return (
    <UserContext.Provider
      value={{
        email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name, surname, setSurname, profile_picture, setProfile_picture, customer_id, setCustomer_Id, LP, setLP
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;