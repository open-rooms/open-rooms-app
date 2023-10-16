import { combineReducers } from 'redux';
import userReducer from './user-slice';
import roomsReducer from './rooms-slice';
import proposalsReducer from './proposals-slice';

const rootReducer = combineReducers({
  userSlice: userReducer,
  roomsSlice: roomsReducer,
  proposalSlice: proposalsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
