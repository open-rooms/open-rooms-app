export enum StorageKeys {
  PRIVATE_KEY = "private_key",
  PUBLICK_KEY = "public_key",
}
export interface IStorageContext {
  accountConnected: boolean;
  connectAccount: (publicKey: string, private_key: string) => any;
  disconnectAccount: () => any;
  accountPublicKey: string;
  accountPrivateKey: string;
}
