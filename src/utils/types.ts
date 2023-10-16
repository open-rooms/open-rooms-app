export enum StorageKeys {
  PRIVATE_KEY = 'private_key',
  PUBLIC_KEY = 'public_key',
}

export enum ProposalStatus {
  LIVE = 'Live',
  PASSED = 'Passed',
  REJECTED = 'Rejected',
}

export enum VoteType {
  YES = 'Yes',
  NO = 'No',
}

export interface IStorageContext {
  accountConnected: boolean;
  publicKey: string;
  privateKey: string;
  storePrivateKey?: (key: string) => Promise<void>;
}

export interface EditRoomProps {
  room: IRoom;
  onUpdate: (updatedRoom: IRoom) => void;
}
export type RootStackParamList = {
  Welcome: undefined;
  Eula: undefined;
  Login: undefined;
  Rooms: undefined;
  Room: {roomId: string};
  Profile: undefined;
  Proposal: {proposal: any};
  EditRoom: {
    room: IRoom;
    onUpdate: (updatedRoom: IRoom) => void;
  };
  EditProfile: undefined;
  GenerateKeys: undefined;
  CreateAccount: {prvKey: string};
};
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

// Base event interface
export interface IEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  sig: string;
}

// Extended interfaces
export interface IUser extends IEvent {
  profilePicUrl: string;
  username: string;
  damus?: string;
}

// Extended interfaces
export interface IRoom extends IEvent {
  name: string;
  about: string;
}

// Extended interfaces
export interface IProposal extends IEvent {
  proposal: string;
  duration: number;
  votes: VoteType;
}
