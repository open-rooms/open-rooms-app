import React, {createContext, useContext, useEffect, useState} from 'react';
import {getData, removeData, storeData} from './storeData';
import {IStorageContext} from './types';
import {StorageKeys} from './types';

const defaultState: IStorageContext = {
  accountConnected: false,
  connectAccount: (publicKey: string, privateKey: string) => Promise<void>,
  disconnectAccount: () => Promise<void>,
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

  const connectAccount = async (pubKey: string, prvKey: string) => {
    try {
      const resp =
        (await storeData(pubKey, StorageKeys.PUBLIC_KEY)) &&
        (await storeData(prvKey, StorageKeys.PRIVATE_KEY));
      if (resp === true) {
        setPublicKey(pubKey);
        setPrivateKey(prvKey);
        setAccountConnected(true);
        Promise.resolve();
      } else {
        Promise.reject();
      }
    } catch {
      Promise.reject();
    }
  };
  const disconnectAccount = async () => {
    try {
      const resp =
        (await removeData(StorageKeys.PUBLIC_KEY)) &&
        (await removeData(StorageKeys.PRIVATE_KEY));
      if (resp === true) {
        setPublicKey('');
        setPrivateKey('');
        setAccountConnected(false);
        Promise.resolve();
      } else {
        Promise.reject();
      }
    } catch {
      Promise.reject();
    }
  };

  return (
    <StorageContext.Provider
      value={{
        accountConnected,
        publicKey,
        privateKey,
        connectAccount,
        disconnectAccount,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
