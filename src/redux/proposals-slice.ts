import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Proposal = {
  id: string;
  proposal: string;
  start_date: number;
  duration: number;
  status: string;
  room: string;
  creator: string;
};

export type ProposalsSlice = {
  proposals: Proposal[];
};

// Fake data
import fakeProposals from '../utils/fakeProposals.json';

const initialState: ProposalsSlice = {
  proposals: fakeProposals,
};

const persistConfig = {
  key: 'proposalSlice',
  storage: AsyncStorage,
};

export const proposalSlice = createSlice({
  name: 'proposalSlice',
  initialState,
  reducers: {
    addProposal: (state, action: PayloadAction<Proposal>) => {
      // register the proposal on the chain
      state.proposals.push(action.payload);
    },
    removeProposal: (state, action: PayloadAction<{id: string}>) => {
      // use nostr to delete on the chain
      const {id} = action.payload;

      state.proposals = state.proposals.filter(item => item.id !== id);
    },
    updateProposalStatus: (
      state,
      action: PayloadAction<{id: string; status: string}>,
    ) => {
      // find the proposal and update its status
      const proposal = state.proposals.find(
        item => item.id === action.payload.id,
      );
      if (proposal) {
        proposal.status = action.payload.status;
      }
    },
  },
});

const selectProposals = (state: any) => state.proposalSlice;

export const storedProposals = createSelector(
  [selectProposals],
  proposals => proposals.proposals,
);

export const {addProposal, removeProposal, updateProposalStatus} =
  proposalSlice.actions;

export default persistReducer(persistConfig, proposalSlice.reducer);
