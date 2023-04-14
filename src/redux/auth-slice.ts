import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthSlice = {
  authData: null;
};

const initialState: AuthSlice = {
  authData: null,
};

const persistConfig = {
  key: 'authSlice',
  storage: AsyncStorage,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.authData = action.payload;
    },

    logout: state => {
      state.authData = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
