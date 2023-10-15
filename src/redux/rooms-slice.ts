import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRoom} from '../utils/types';
import {getRooms} from '../nostr-tools/getRooms';
import {selectPrivateKey} from './user-slice';
import {generatePublic} from '../nostr-tools/generateKeys';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (filterByAuthor: boolean, {getState}) => {
    try {
      const state = getState();
      const privateKey = selectPrivateKey(state);
      if (!privateKey) {
        throw new Error('Private key not found');
      }
      const rooms = await getRooms(privateKey);
      if (filterByAuthor) {
        const publicKey = generatePublic(privateKey);
        return rooms.filter(room => room.creator.pubKey === publicKey);
      }
      return rooms;
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

export type RoomsSlice = {
  rooms: IRoom[];
};

const initialState: RoomsSlice = {
  rooms: [],
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
  extraReducers: builder => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
  },
});

const selectRooms = (state: any) => state.roomSlice;

export const storedRooms = createSelector([selectRooms], rooms =>
  rooms ? rooms.rooms : [],
);

export const {addRoom, removeRoom} = roomSlice.actions;

export default persistReducer(persistConfig, roomSlice.reducer);
