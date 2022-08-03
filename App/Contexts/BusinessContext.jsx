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
  const [stamps, setStamps] = useState(0);
  const [validFor, setValidFor] = useState('');
  const [reward, setReward] = useState('');
  const [LP_ID, setLP_ID] = useState();
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
  }, [userId])

  useEffect(() => {
    const getLP = async () => {
      await axios.get(`/LP?id=${businessID}`).then(res => {
        setStamps(res.data.stamps)
        setValidFor(res.data.valid_for)
        setReward(res.data.reward)
        setLP_ID(res.data.id)
        console.log(LP_ID);

      })
    }
    if (businessID > 0) {
      console.log('true')
      getLP()
    }
  }, [businessID])


  return (
    <BusinessContext.Provider
      value={{
        businessName, loyaltyProgramme, setBusinessName, setLoyaltyProgramme, businessID, setBusinessID, category, setCategory, logo,
        setLogo, stamps, setStamps, validFor, setValidFor, reward, setReward, LP_ID, setLP_ID
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;