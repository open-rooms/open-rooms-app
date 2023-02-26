import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, removeData, storeData } from "./storeData";
import { IStorageContext } from "./types";
import { StorageKeys } from "./types";

const defaultState: IStorageContext = {
  accountConnected: false,
  connectAccount: (publicKey: string, privateKey: string) => Promise<void>,
  disconnectAccount: () => Promise<void>,
  publicKey: "",
  privateKey: "",
};

export const StorageContext = createContext<IStorageContext>(defaultState);

export const useStorage = () => useContext(StorageContext);

export function StorageContextProvider({ children }: any) {
  const [accountConnected, setAccountConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    async function fetchPublicKey() {
      try {
        const pubKey = await getData(StorageKeys.PUBLICK_KEY);
        if (pubKey) {
          setPublicKey(pubKey);
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
          setPrivateKey(privKey);
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
        setPublicKey(publicKey);
        setPrivateKey(privateKey);
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
        setPublicKey("");
        setPrivateKey("");
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
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
