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
    const proposals = await getProposals();
    if (Array.isArray(proposals)) {
      proposals.forEach((proposal: IProposal) => {
        dispatch(addProposal(proposal));
      });
      return proposals;
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
      state.proposals.push(action.payload);
    },
    removeProposal: (state, action: PayloadAction<{id: string}>) => {
      state.proposals = state.proposals.filter(
        item => item.id !== action.payload.id,
      );
    },
    updateProposalStatus: (
      state,
      action: PayloadAction<{id: string; status: string}>,
    ) => {
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

const selectProposals = (state: RootState) => state.proposalSlice;

export const storedProposals = createSelector([selectProposals], proposals =>
  proposals ? proposals.proposals : [],
);

export const {addProposal, removeProposal, updateProposalStatus} =
  proposalSlice.actions;

export default persistReducer(persistConfig, proposalSlice.reducer);
