import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

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

export interface IFeed {
  proposals: IProposal[];
}

export interface IProposal {
  id: string;
  content: string; // proposal content
  authorPublicKey: string; // author pubkey
  tags: string[]; // includes a "room" tag
}

export interface IRoom {
  id: string;
  name: string;
  username: string; // @room-name
  pubkey: string; // author pubkey
  tags: string[];
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
}
