import React, {createContext, useContext, useEffect, useState} from 'react';
import {getData} from './storeData';
import {IStorageContext} from './types';
import {StorageKeys} from './types';

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

  useEffect(() => {
    async function fetchPublicKey() {
      try {
        const storedKey = await getData(StorageKeys.PUBLIC_KEY);
        if (storedKey) {
          setPublicKey(storedKey);
          setAccountConnected(true);
        }
      } catch {
        //
      }
    }
    async function fetchPrivateKey() {
      try {
        const storedKey = await getData(StorageKeys.PRIVATE_KEY);
        if (storedKey) {
          setPrivateKey(storedKey);
          setAccountConnected(true);
        }
      } catch {
        //
      }
    }
    fetchPrivateKey();
    fetchPublicKey();
  }, []);

  return (
    <StorageContext.Provider
      value={{
        accountConnected,
        publicKey,
        privateKey,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
