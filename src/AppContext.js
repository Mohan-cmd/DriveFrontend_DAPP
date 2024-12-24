import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  return (
    <AppContext.Provider value={{ account, setAccount, contract, setContract }}>
      {children}
    </AppContext.Provider>
  );
};
