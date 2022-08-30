import { createContext, useState, useEffect, useContext } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from './UserContext';
import socket from '../Hooks/Socket';

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
  // const [reward, setReward] = useState()


  useEffect(() => {
    const getBusiness = async () => {
      await axios.get(`/api/business/${userId}`).then(res => {
        setBusinessID(res.data.id)
        setBusinessName(res.data.business_name)
        setCategory(res.data.category)
        setLogo(res.data.logo)
      }).catch(setBusinessID())
    }
    if (userId > 0) {
      getBusiness()
    } else {
      setBusinessID()
    }
  }, [userId])

  useEffect(() => {
    const getLP = async () => {
      await axios.get(`/api/LP?id=${businessID}`).then(res => {
        setLoyaltyProgramme(res.data)
        setLP_id(res.data.id)
      })
    }
    if (businessID > 0) {
      getLP()
    } else {
      setBusinessName()
      setCategory()
      setLogo()
      setLP_id()
    }
  }, [businessID])

  useEffect(() => {
    const getMembers = async () => {
      await axios.get(`/api/LP/${LP_id}/users`).then(res => {
        setMembers(res.data.count)
      
      })
      .catch(error => console.log(error))
    }
    if (LP_id > 0) {
      // console.log('id')
      socket.emit("add loyalty programme", {
      LP_id
    });
      getMembers()
    } else {
      setMembers()
      setLoyaltyProgramme('none')
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