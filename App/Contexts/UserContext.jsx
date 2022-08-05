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
  const [userId, setUserId] = useState();
  const [LP, setLP] = useState();
  const [updateStamps, setUpdateStamps] = useState(false);
  const [focusLP, setFocusLP] = useState();

  useEffect(() => {
    const getUser = async () => {
      await axios.get(`/user?user_id=${userId}`).then(res => {
        console.log(res.data)
        const { first_name, profile_picture, surname, username } = res.data
        setUsername(username);
        setFirst_name(first_name);
        setSurname(surname);
        setProfile_picture(profile_picture);
      })
    }
    if (userId == 0 || !userId) {
      setUsername();
      setFirst_name();
      setSurname();
      setProfile_picture();
    } else {
      getUser();
      setUpdateStamps(true)
    }
  }, [userId])

  useEffect(() => {
    const getUserStamps = async () => {
      if (userId > 0) {
        await axios.get(`/stamps?customer_id=${userId}`).then(res => {
          console.log(res.data)
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
        email, setEmail, password, setPassword, username, setUsername, first_name, setFirst_name,
        surname, setSurname, profile_picture, setProfile_picture, userId, setUserId, LP, setLP, setUpdateStamps,
        focusLP, setFocusLP
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;