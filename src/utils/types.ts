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
  profilePic: string;
  name: string;
  username: string;
  about: string;
  start_date: number;
  creator: string;
  damus: string;
  members: string[];
}
export interface IEvent {
  id: string;
  content: string;
  tags: string[][];
}
export type RootStackParamList = {
  Welcome: undefined;
  Eula: undefined;
  Register: undefined;
  Login: undefined;
  Rooms: undefined;
  Room: {roomId: string};
  Profile: undefined;
};
