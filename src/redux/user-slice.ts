import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPublicKey} from 'nostr-tools';
import {RootState} from './rootReducer';

export type UserSlice = {
  userData: {
    publicKey: string;
    username: string;
    imgUri: string;
    damus: string;
  };
  privateKey: string;
};

const initialState: UserSlice = {
  userData: {
    publicKey: '',
    username: '',
    imgUri: '',
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
      console.log('Action received in reducer:', action);
      state.userData = {
        publicKey: getPublicKey(action.payload.privateKey),
        username: action.payload.userData.username,
        imgUri: action.payload.userData.imgUri,
        damus: action.payload.userData.damus,
      };
      state.privateKey = action.payload.privateKey;
      console.log('New State after login:', state);
    },
    register: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.privateKey = action.payload.privateKey;
    },
    createAccount: (state, action: PayloadAction<any>) => {
      // create account

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

export const selectPrivateKey = createSelector(
  [selectUser],
  user => user.privateKey,
);

export const selectPublicKey = createSelector(
  [selectUser],
  user => user.userData.pubkey,
);

export const isConnected = createSelector(
  [selectUser],
  user => user.privateKey !== '',
);

export const {login, register, logout, createAccount} = userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
