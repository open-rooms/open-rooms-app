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
import {RootState} from './rootReducer';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, {getState}) => {
    const state = getState();
    const privateKey = selectPrivateKey(state);
    if (!privateKey) {
      throw new Error('Private key not found');
    }

    // Fetch all rooms. getRooms should handle the logic based on privateKey
    return await getRooms(privateKey);
  },
);

export type RoomsSlice = {
  rooms: IRoom[];
};

const initialState: RoomsSlice = {
  rooms: [],
};

export const selectRooms = createSelector(
  (state: RootState) => state.rooms.rooms,
  rooms => rooms,
);

export const selectMyRooms = createSelector(
  [selectRooms, selectPrivateKey],
  (rooms, privateKey) => {
    if (!privateKey) {
      return [];
    }
    const publicKey = generatePublic(privateKey);
    return rooms.filter((room: IRoom) => room.pubkey === publicKey);
  },
);

const persistConfig = {
  key: 'roomsSlice',
  storage: AsyncStorage,
};

export const roomsSlice = createSlice({
  name: 'roomsSlice',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<IRoom>) => {
      state.rooms.push(action.payload);
    },
    removeRoom: (state, action: PayloadAction<{id: string}>) => {
      state.rooms = state.rooms.filter(room => room.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
    // Handle other asynchronous actions if needed
  },
});

export const {addRoom, removeRoom} = roomsSlice.actions;

export default persistReducer(persistConfig, roomsSlice.reducer);
