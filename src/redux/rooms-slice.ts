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
import {selectPublicKey} from './user-slice';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (filterByAuthor: boolean, {getState}) => {
    console.log('fetchRooms action triggered'); // Debug line
    try {
      const state = getState();
      const privateKey = selectPrivateKey(state);
      console.log('Private key in rooms-slice:', privateKey); // Debug line
      if (!privateKey) {
        console.log('Private key not found'); // Add this log
        throw new Error('Private key not found');
      }

      console.log('About to call getRooms'); // Debug line
      const rooms = await getRooms(privateKey);
      console.log('Rooms fetched in fetchRooms:', rooms); // Debug line

      if (filterByAuthor) {
        const publicKey = generatePublic(privateKey);
        return rooms.filter(room => room.pubkey === publicKey);
      }
      return rooms;
    } catch (error) {
      console.error('Error in fetchRooms:', String(error)); // Debug line
      throw new Error(String(error));
    }
  },
);

export type RoomsSlice = {
  rooms: IRoom[];
};

// Initial state
const initialState: RoomsSlice = {
  rooms: [],
};

// Selector for getting all rooms
export const selectRooms = createSelector(
  (state: RootState) => state.roomsSlice ?? {},
  roomsSlice => roomsSlice.rooms ?? [],
);

// Selector for filtering rooms by public key
export const selectMyRooms = createSelector(
  [selectRooms, selectPublicKey],
  (rooms, publicKey) => {
    console.log(
      'My Rooms from Redux Store:',
      rooms?.filter((room: IRoom) => room.pubkey === publicKey) ?? [],
    ); // Debug line
    return rooms
      ? rooms.filter((room: IRoom) => room.pubkey === publicKey)
      : [];
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
    addRoom: (state, action: PayloadAction<any>) => {
      // existing logic
    },
    removeRoom: (state, action: PayloadAction<{id: string}>) => {
      // existing logic
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      console.log('Type of action.payload:', typeof action.payload);
      console.log(
        'Structure of action.payload:',
        JSON.stringify(action.payload, null, 2),
      );
      state.rooms = action.payload;
      console.log('Reducer received rooms:', action.payload); // Debug line
    });

    // You can add more cases for other asynchronous actions if needed
  },
});

export const {addRoom, removeRoom} = roomsSlice.actions;

export default persistReducer(persistConfig, roomsSlice.reducer);
