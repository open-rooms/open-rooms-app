import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRoom} from '../utils/types';

export type RoomsSlice = {
  rooms: IRoom[];
};

// Fake data
import fakeRooms from '../utils/fakeRooms.json';

const initialState: RoomsSlice = {
  rooms: fakeRooms,
};

const persistConfig = {
  key: 'roomSlice',
  storage: AsyncStorage,
};

export const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<any>) => {
      // register on room on chain
      state.rooms.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<any>) => {
      // use nostr to delete on chain
      const {id} = action.payload;

      state.rooms = state.rooms.filter(item => item.id !== id);
    },
  },
});

const selectRooms = (state: any) => state.rooms;

export const storedRooms = createSelector(
  [selectRooms],
  roomsSlice => roomsSlice.rooms,
);

export const {addRoom, removeRoom} = roomSlice.actions;

export default persistReducer(persistConfig, roomSlice.reducer);
