import React, { useContext } from 'react';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Logout = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
 
  const ClearLogin = () => {
    AsyncStorage.removeItem('Credentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
      return null;
  };

  return (
    <ClearLogin/>
  );
};

export default Logout;
