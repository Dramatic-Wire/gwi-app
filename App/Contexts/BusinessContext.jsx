import { createContext, useState, useEffect  } from 'react';
import AxiosInstance from '../Hooks/AxiosInstance';
import UserContext from './UserContext';

const {userId} = useContext(UserContext)
const BusinessContext = createContext({});


export const BusinessProvider = ({ children }) => {  
  const axios = AxiosInstance();
  const [businessID, setBusinessID] = useState();
  const [businessName, setBusinessName] = useState();
  const [category, setCategory] = useState()
  const [logo, setLogo] = useState('');
  const [loyaltyProgramme, setLoyaltyProgramme] = useState({});
  

  useEffect(() => {
    const getBusiness = async () => {
      await axios.get(`/business/?id=${userId}`).then(res => {
        console.log(res.data)
      })
    }
    if (businessID > 0) {
      getBusiness()
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