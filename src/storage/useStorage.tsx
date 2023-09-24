import React, {createContext, useContext, useEffect, useState} from 'react';
import {setData, getData} from './storeData'; // make sure to import storeData
import {IStorageContext} from '../utils/types';
import {StorageKeys} from '../utils/types';

const defaultState: IStorageContext = {
  accountConnected: false,
  publicKey: '',
  privateKey: '',
};

export const StorageContext = createContext<IStorageContext>(defaultState);

export const useStorage = () => useContext(StorageContext);

export function StorageContextProvider({children}: any) {
  const [accountConnected, setAccountConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const storePrivateKey = async (key: string) => {
    try {
      await setData(key, StorageKeys.PRIVATE_KEY);
      console.log('Private key stored successfully');
      setPrivateKey(key);
    } catch (error) {
      console.error('Could not store private key', error);
    }
  };

  useEffect(() => {
    async function fetchKeys() {
      try {
        console.log('Fetching keys from storage...');
        const pubKey = await getData(StorageKeys.PUBLIC_KEY);
        const privKey = await getData(StorageKeys.PRIVATE_KEY);
  
        // Check if it's likely the first time the app is launched
        if (!pubKey && !privKey) {
          console.log('No keys found in storage. This is likely the first app launch.');
          // Optionally, generate new keys here or navigate the user to a setup screen
          // to handle first-time scenarios.
          return;
        }
  
        if (pubKey) {
          console.log('Fetched public key:', pubKey);
          setPublicKey(pubKey);
        } else {
          console.log('No public key found.');
        }
  
        if (privKey) {
          console.log('Fetched private key:', privKey);
          setPrivateKey(privKey);
        } else {
          console.log('No private key found.');
        }
  
        if (pubKey && privKey) {
          setAccountConnected(true);
        } else {
          setAccountConnected(false);
        }
      } catch (error: any) {
        console.error('Error occurred while fetching keys:', error.message);
        if (error.message === 'No value found') {
          console.log(
            'No stored keys found, this is expected for first-time users.',
          );
        } else {
          console.error('Could not fetch keys', error);
        }
        setAccountConnected(false);
      }
    }
  
    fetchKeys();
  }, []);
  

  return (
    <StorageContext.Provider
      value={{
        accountConnected,
        publicKey,
        privateKey,
        storePrivateKey,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
