import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPublicKey} from 'nostr-tools';

export type UserSlice = {
  userData: {
    publicKey: string;
    username: string;
    profileImageUri: string;
    damus: string;
  };
  privateKey: string;
};

const initialState: UserSlice = {
  userData: {
    publicKey: '',
    username: '',
    profileImageUri: '',
    damus: '',
  },
  privateKey: '',
};

const persistConfig = {
  key: 'userSlice',
  storage: AsyncStorage,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      // get data from nostr to fill userData
      state.userData = {
        publicKey: getPublicKey(action.payload.privateKey),
        username: '',
        profileImageUri: '',
        damus: '',
      };
      state.privateKey = action.payload.privateKey;
    },
    register: (state, action: PayloadAction<any>) => {
      // use nostr to register on chain

      state.userData = action.payload;
      state.privateKey = action.payload.privateKey;
    },

    logout: state => {
      state.userData = initialState.userData;
      state.privateKey = '';
    },
  },
});
const selectUser = (state: any) => state.user;

export const isConnected = createSelector(
  [selectUser],
  user => user.privateKey !== '',
);
export const publicKey = createSelector(
  [selectUser],
  user => user.userData.publicKey,
);

export const {login, register, logout} = userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
