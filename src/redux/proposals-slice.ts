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
import {RootState} from './rootReducer';

export const fetchProposals = createAsyncThunk(
  'proposals/fetchProposals',
  async (_, {dispatch}) => {
    console.log('fetchProposals initiated');
    const proposals = await getProposals();
    if (Array.isArray(proposals)) {
      console.log('Fetched proposals:', proposals);
      proposals.forEach((proposal: IProposal) => {
        dispatch(addProposal(proposal));
      });
      return proposals; // Return fetched proposals as payload
    } else {
      console.error(
        'Expected proposals to be an array but received a different type.',
      );
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
      console.log('Adding proposal:', action.payload);
      state.proposals.push(action.payload);
    },
    removeProposal: (state, action: PayloadAction<{id: string}>) => {
      console.log('Removing proposal with id:', action.payload.id);
      state.proposals = state.proposals.filter(
        item => item.id !== action.payload.id,
      );
    },
    updateProposalStatus: (
      state,
      action: PayloadAction<{id: string; status: string}>,
    ) => {
      console.log(
        `Updating proposal ${action.payload.id} with status ${action.payload.status}`,
      );
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

const selectProposals = (state: RootState) => {
  console.log('Proposal Slice State:', state.proposalSlice);
  return state.proposalSlice;
};

export const storedProposals = createSelector(
  [selectProposals],
  proposals => proposals ? proposals.proposals : []
);

export const {addProposal, removeProposal, updateProposalStatus} =
  proposalSlice.actions;

export default persistReducer(persistConfig, proposalSlice.reducer);
