import { GOT_LOANS } from './LoansActions';

// Initial State
const initialState = { data: [] };

const LoansReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_LOANS :
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all loans
export const getLoans = state => state.loans.data;

// Export Reducer
export default LoansReducer;
