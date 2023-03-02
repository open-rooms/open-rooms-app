export enum StorageKeys {
  PRIVATE_KEY = "private_key",
  PUBLICK_KEY = "public_key",
}
export interface IStorageContext {
  accountConnected: boolean;
  connectAccount: (publicKey: string, privateKey: string) => any;
  disconnectAccount: () => any;
  publicKey: string;
  privateKey: string;
}
export interface IButtonProps {
  title: string;
  onPress(): void;
  buttonColor: string;
  titleColor: string;
  buttonStyle: any;
  disabled?: boolean;
  isLoading?: boolean;
}
export interface IBackButton {
  color: string;
  style?: object;
}
