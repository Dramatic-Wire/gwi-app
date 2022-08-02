import { createContext, useState, useEffect, useContext  } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from './UserContext';

const BusinessContext = createContext({});


export const BusinessProvider = ({ children }) => {  
  const axios = AxiosInstance();
  const { userId } = useContext(UserContext)
  const [businessID, setBusinessID] = useState();
  const [businessName, setBusinessName] = useState();
  const [category, setCategory] = useState()
  const [logo, setLogo] = useState('');
  const [loyaltyProgramme, setLoyaltyProgramme] = useState({});
  

  useEffect(() => {
    const getBusiness = async () => {
      await axios.get(`/business/${userId}`).then(res => {
        console.log('------')
        console.log(res.data)
        console.log('------')
        setBusinessID(res.data.id)
        setBusinessName(res.data.business_name)
        setCategory(res.data.category)
        setLogo(res.data.logo)
      })
    }
    if (userId > 0) {
      console.log('test')
      getBusiness()
    } 
  },[userId])


  return (
    <BusinessContext.Provider
      value={{
        businessName, loyaltyProgramme, setBusinessName, setLoyaltyProgramme, businessID, setBusinessID, category, setCategory, logo, setLogo
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;