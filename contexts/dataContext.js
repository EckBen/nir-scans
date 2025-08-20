import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from './authContext';
import { useLoading } from './loadingContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [scanners, setScanners] = useState(null);
  const [fields, setFields] = useState(null);
  const [plants, setPlants] = useState(null);

  const { userAuth, makeApiRequestWithJwt } = useAuth();
  const { updateLoading } = useLoading();

  useEffect(() => {
    (async () => {
      if (userAuth) {
        updateLoading(['userData'],[]);
        await new Promise((res) => setTimeout(() => res(null), 2000));
        
        console.group('GET USER DB DATA HERE');
        console.log(userAuth);
        console.groupEnd('GET USER DB DATA HERE');

        // STUB
        const response = { success: true };
        // const response = { error: 'error' };

        updateLoading([],['userData']);
      }
    })();
  }, [userAuth]);

  return (
    <DataContext.Provider value={{
      userData,
      scanners,
      fields,
      plants
    }}>{ children }</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);