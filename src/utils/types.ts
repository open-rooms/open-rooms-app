export enum StorageKeys {
  PRIVATE_KEY = 'private_key',
  PUBLIC_KEY = 'public_key',
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
export interface IRoom {
  id: string;
  name: string;
  username: string;
}
export interface IEvent {
  id: string;
  content: string;
  tags: string[][];
}
