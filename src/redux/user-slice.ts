import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserSlice = {
  userData: {
    pubKey: string;
    username: string;
  };
  privateKey: string;
};

const initialState: UserSlice = {
  userData: {
    pubKey: '',
    username: '',
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
      state.userData = action.payload;
    },

    logout: state => {
      state.userData = initialState.userData;
      state.privateKey = '';
    },
  },
});

export const {login, logout} = userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
