import { createContext, useState, useEffect  } from 'react';

const BusinessContext = createContext({});

export const BusinessProvider = ({ children }) => {  
  const [businessID, setBusinessID] = useState(4);
  const [businessName, setBusinessName] = useState(`George's Coffee Shop`);
  const [loyaltyProgramme, setLoyaltyProgramme] = useState({});

  return (
    <BusinessContext.Provider
      value={{
        businessName, loyaltyProgramme, setBusinessName, setLoyaltyProgramme
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;