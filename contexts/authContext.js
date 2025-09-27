import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/authService";
import { useLoading } from "./loadingContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  // const [jwt, setJwt] = useState(null);

  const { updateLoading } = useLoading();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    updateLoading(['userInfo'],[]);

    
    const response = await authService.getUser();

    // // STUB
    // const response = {
    //   "$id": "689267890026a49a66ea",
    //   "$createdAt": "2025-08-05T20:20:25.710+00:00",
    //   "$updatedAt": "2025-08-14T20:03:39.859+00:00",
    //   "name": "Benjamin Eck",
    //   "registration": "2025-08-05T20:20:25.709+00:00",
    //   "status": true,
    //   "labels": [],
    //   "passwordUpdate": "2025-08-14T20:03:39.856+00:00",
    //   "email": "eck_ben@yahoo.com",
    //   "phone": "+16073517150",
    //   "emailVerification": false,
    //   "phoneVerification": false,
    //   "mfa": false,
    //   "prefs": {},
    //   "targets": [
    //     {
    //       "$id": "68926789eae4edf5cac9",
    //       "$createdAt": "2025-08-05T20:20:25.962+00:00",
    //       "$updatedAt": "2025-08-05T20:20:25.962+00:00",
    //       "name": "",
    //       "userId": "689267890026a49a66ea",
    //       "providerId": null,
    //       "providerType": "email",
    //       "identifier": "eck_ben@yahoo.com",
    //       "expired": false
    //     },
    //     {
    //       "$id": "68926789ee4593e174e7",
    //       "$createdAt": "2025-08-05T20:20:25.975+00:00",
    //       "$updatedAt": "2025-08-05T20:20:25.975+00:00",
    //       "name": "",
    //       "userId": "689267890026a49a66ea",
    //       "providerId": null,
    //       "providerType": "sms",
    //       "identifier": "+16073517150",
    //       "expired": false
    //     }
    //   ],
    //   "accessedAt": "2025-08-14 20:03:55.554"
    // }



    console.log('checkUser: ', response);

    if (response?.error) {
      setUserAuth(null);
      updateLoading([],['userData']);
    } else {
      setUserAuth(response);
    }

    updateLoading([], ['userInfo', 'userAuth']);
  }

  const login = async (email, password) => {
    updateLoading(['userAuth'], []);
    
    await new Promise((res) => setTimeout(() => res(null), 2000));
    
    const response = await authService.login(email, password);

    // // STUB
    // const response = {
    //   "$id": "689e412acc585b3370b7",
    //   "$createdAt": "2025-08-14T20:03:55.243+00:00",
    //   "$updatedAt": "2025-08-14T20:03:55.243+00:00",
    //   "userId": "689267890026a49a66ea",
    //   "expire": "2026-08-14T20:03:54.837+00:00",
    //   "provider": "email",
    //   "providerUid": "eck_ben@yahoo.com",
    //   "providerAccessToken": "",
    //   "providerAccessTokenExpiry": "",
    //   "providerRefreshToken": "",
    //   "ip": "2601:83:4200:2f60:a422:db35:bb1:4bea",
    //   "osCode": "AND",
    //   "osName": "Android",
    //   "osVersion": "11",
    //   "clientType": "browser",
    //   "clientCode": "SB",
    //   "clientName": "Samsung Browser",
    //   "clientVersion": "14.2",
    //   "clientEngine": "WebKit",
    //   "clientEngineVersion": "537.36",
    //   "deviceName": "smartphone",
    //   "deviceBrand": "Samsung",
    //   "deviceModel": "Galaxy S10",
    //   "countryCode": "us",
    //   "countryName": "United States",
    //   "current": true,
    //   "factors": [
    //     "password"
    //   ],
    //   "secret": "",
    //   "mfaUpdatedAt": ""
    // }

    console.log('login: ', response);

    let result;
    if (response?.error) {
      result = response;
    } else {
      await checkUser();
      result = { success: true };
    }

    updateLoading([], ['userAuth']);
    return result;
  };

  const register = async (email, password) => {
    // const response = await authService.register(email, password);
    const response = { success: true };

    if (response?.error) {
      return response;
    }

    return login(email, password); // Auto login after register
  };

  const logout = async () => {
    // await authService.logout();
    setUserAuth(null);
  }

  // const getJwt = async (forceRefresh=false) => {
  //   let newJwt;
  //   if (jwt === null || forceRefresh) {
  //     newJwt = await authService.createJwt();
  //     setJwt(newJwt);
  //   } else {
  //     newJwt = jwt;
  //   }
  //   return newJwt;
  // };
  
  return (
    <AuthContext.Provider value={{
      userAuth,
      login,
      register,
      logout,
      // getJwt
    }}>{ children }</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);