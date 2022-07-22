import { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const axios = AxiosInstance();
  const [customerID, setCustomerID] = useState();
  const [customerName, setCustomerName] = useState();
  const [validFor, setValidFor] = useState()
  const [stampCount, setStampCount] = useState('');
  const [stamped, setStamped] = useState('');
  const [reward, setReward] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      await axios.get(`api/stamps/?id=${customerID}`).then(res => {
        console.log(res.data)
      })
    }
    if (customerID > 0) {
      getUserInfo()
    }
  }, [customerID])

  // customerName = 'Sylvia', validFor = '1 month', stampCount = 5, stamped = 2, reward = '1 free item'

  return (
    <UserContext.Provider
      value={{
        customerName, setCustomerName, validFor, setValidFor, customerID, setCustomerID, stampCount, setStampCount, stamped, setStamped, reward, setReward
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;