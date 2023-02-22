import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, removeData, storeData } from "./store-data";
import { IStorageContext } from "./types";
import { StorageKeys } from "./types";

const defaultState: IStorageContext = {
  accountConnected: false,
  connectAccount: (publicKey: string, privateKey: string) => Promise<void>,
  disconnectAccount: () => Promise<void>,
  accountPublicKey: "",
  accountPrivateKey: "",
};

export const StorageContext = createContext<IStorageContext>(defaultState);

export const useStorage = () => useContext(StorageContext);

export function StorageContextProvider({ children }: any) {
  const [accountConnected, setAccountConnected] = useState(false);
  const [accountPublicKey, setAccountPublicKey] = useState("");
  const [accountPrivateKey, setAccountPrivateKey] = useState("");

  useEffect(() => {
    async function fetchPublicKey() {
      try {
        const pubKey = await getData(StorageKeys.PUBLICK_KEY);
        if (pubKey) {
          setAccountPublicKey(pubKey);
          setAccountConnected(true);
        }
      } catch {
        //
      }
    }
    async function fetchPrivateKey() {
      try {
        const privKey = await getData(StorageKeys.PRIVATE_KEY);
        if (privKey) {
          setAccountPrivateKey(privKey);
          setAccountConnected(true);
        }
      } catch {
        //
      }
    }
    fetchPrivateKey();
    fetchPublicKey();
  }, []);

  const connectAccount = async (publicKey: string, privateKey: string) => {
    try {
      const resp =
        (await storeData(publicKey, StorageKeys.PUBLICK_KEY)) &&
        (await storeData(publicKey, StorageKeys.PRIVATE_KEY));
      if (resp === true) {
        setAccountPublicKey(publicKey);
        setAccountPrivateKey(privateKey);
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
        (await removeData(StorageKeys.PUBLICK_KEY)) &&
        (await removeData(StorageKeys.PRIVATE_KEY));
      if (resp === true) {
        setAccountPublicKey("");
        setAccountPrivateKey("");
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
        accountPublicKey,
        accountPrivateKey,
        connectAccount,
        disconnectAccount,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
