import { createContext, useState, useEffect  } from 'react';

const BusinessContext = createContext({});

export const BusinessProvider = ({ children }) => {  
  const [businessID, setBusinessID] = useState();
  const [businessName, setBusinessName] = useState();
  const [category, setCategory] = useState()
  const [logo, setLogo] = useState('');

  const [loyaltyProgramme, setLoyaltyProgramme] = useState({});

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