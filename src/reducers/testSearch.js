import { CHANGE_SEARCH_FIELD } from '../constants';

const initialState = {
  searchField: '',
}

export const testSearch = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, pending: true }
    default:
      return state;
  }
}
