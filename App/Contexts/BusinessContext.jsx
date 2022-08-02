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
  const [loyaltyProgramme, setLoyaltyProgramme] = useState();
  

  useEffect(() => {
    const getBusiness = async () => {
      await axios.get(`/business/${userId}`).then(res => {
        
        setBusinessID(res.data.id)
        setBusinessName(res.data.business_name)
        setCategory(res.data.category)
        setLogo(res.data.logo)
      })
    }
    if (userId > 0) {
      getBusiness()
    } 
  },[userId])

  useEffect(() => {
    const getLP = async () => {
      await axios.get(`/LP?id=${businessID}`).then(res => {
        console.log('------')
        console.log(res.data)
        console.log('------')
        //setLoyaltyProgramme({ stampsRequired: 1, reward: 1, timeFrame: 1, members:1 });
        console.log(loyaltyProgramme)
      })
    }
    if (businessID > 0) {
      getLP()
    } 
    
  },[businessID])


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