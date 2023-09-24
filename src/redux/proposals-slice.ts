import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IProposal} from '../utils/types';
import {getProposals} from '../nostr-tools/getProposals';

export const fetchProposals = createAsyncThunk(
  'proposals/fetchProposals',
  async (_, {dispatch}) => {
    const proposals = getProposals();
    if (Array.isArray(proposals)) {
      // Check if proposals is an array
      proposals.forEach((proposal: IProposal) => {
        dispatch(addProposal(proposal));
      });
      return proposals; // Return fetched proposals as payload
    } else {
      throw new Error(
        'Expected proposals to be an array but received a different type.',
      );
    }
  },
);

export type ProposalsSlice = {
  proposals: IProposal[];
};

const initialState: ProposalsSlice = {
  proposals: [],
};

const persistConfig = {
  key: 'proposalSlice',
  storage: AsyncStorage,
};

export const proposalSlice = createSlice({
  name: 'proposalSlice',
  initialState,
  reducers: {
    addProposal: (state, action: PayloadAction<IProposal>) => {
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
  extraReducers: builder => {
    builder.addCase(fetchProposals.fulfilled, (state, action) => {
      state.proposals = action.payload;
    });
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
