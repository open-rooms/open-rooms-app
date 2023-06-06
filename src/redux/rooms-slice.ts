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
    addRoom: (state, action: PayloadAction<IRoom>) => {
      // register the room on the chain
      state.rooms.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<{id: string}>) => {
      // use nostr to delete on the chain
      const {id} = action.payload;

      state.rooms = state.rooms.filter(item => item.id !== id);
    },
  },
});

const selectRooms = (state: any) => state.roomSlice;

export const storedRooms = createSelector([selectRooms], rooms => rooms.rooms);

export const {addRoom, removeRoom} = roomSlice.actions;

export default persistReducer(persistConfig, roomSlice.reducer);
