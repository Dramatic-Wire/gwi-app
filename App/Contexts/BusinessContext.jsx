import { createContext, useState, useEffect, useContext } from 'react';
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
  const [LP_id , setLP_id] = useState()
  const [members, setMembers] = useState()


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
  }, [userId])

  useEffect(() => {
    const getLP = async () => {
      await axios.get(`/LP?id=${businessID}`).then(res => {
        setLoyaltyProgramme(res.data)
        setLP_id(res.data.id)
      })
    }
    if (businessID > 0) {
      getLP()
    }
  }, [businessID])

  useEffect(() => {
    const getMembers = async () => {
      await axios.get(`/LP/${LP_id}/users`).then(res => {
        setMembers(res.data.count)
        // console.log(res.data);
        // console.log(res.data.count);
      
      })
      .catch(error => console.log(error))
    }
    if (LP_id > 0) {
      // console.log('id')
      getMembers()
    }
    
  }, [LP_id])
 

  return (
    <BusinessContext.Provider
      value={{ 
        businessName, loyaltyProgramme, setBusinessName, setLoyaltyProgramme, businessID, setBusinessID, category, setCategory, logo,
        setLogo, LP_id, setLP_id, members, setMembers
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;