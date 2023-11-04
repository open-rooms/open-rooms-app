import {combineReducers} from 'redux';
import userReducer, { UserSlice } from './user-slice';
import roomsReducer from './rooms-slice';
import { ProposalsSlice } from './proposals-slice';
import proposalsReducer from './proposals-slice';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IRoom } from '../utils/types';

const rootReducer = combineReducers({
  userSlice: userReducer,
  roomsSlice: roomsReducer,
  proposalSlice: proposalsReducer,
});

export type RootState = {
  userSlice: UserSlice & PersistPartial;
  rooms: {
    rooms: IRoom[];
  } & PersistPartial;
  proposalSlice: ProposalsSlice & PersistPartial;
};

