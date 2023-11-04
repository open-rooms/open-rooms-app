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
import {selectPrivateKey, selectPublicKey} from './user-slice';
import {generatePublic} from '../nostr-tools/generateKeys';
import {RootState} from './rootReducer';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (filterByAuthor: boolean, {getState}) => {
    console.log('fetchRooms action triggered'); // Debug line
    try {
      const state = getState();
      const privateKey = selectPrivateKey(state);
      console.log('Private key in rooms-slice:', privateKey); // Debug line
      if (!privateKey) {
        console.log('Private key in rooms-slice not found'); // Debug line
        throw new Error('Private key not found');
      }
      console.log('Rooms-slice: About to call getRooms'); // Debug line
      const rooms = await getRooms(privateKey);
      // console.log('Rooms fetched in fetchRooms:', rooms); // Debug line
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

const initialState: RoomsSlice = {
  rooms: [],
};
console.log('Initial State:', initialState);

export const selectRooms = createSelector(
  (state: RootState) => state.rooms.rooms, // This matches the actual state shape
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
    addRoom: (state, action: PayloadAction<any>) => {
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
      console.log('Type of action.payload:', typeof action.payload);
      console.log(
        'Structure of action.payload:',
        JSON.stringify(action.payload, null, 2),
      );
      console.log('Received action:', action);
      console.log('State before update:', state);
      state.rooms = action.payload;
      console.log('State after update:', state.rooms);
      //console.log('New state after setting rooms:', state); // Debug line
      //console.log('Reducer received rooms:', action.payload); // Debug line
    });

    // You can add more cases for other asynchronous actions if needed
  },
});

export const {addRoom, removeRoom} = roomsSlice.actions;

export default persistReducer(persistConfig, roomsSlice.reducer);
