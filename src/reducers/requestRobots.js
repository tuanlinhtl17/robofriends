import { 
  REQUEST_ON_FAILED,
  REQUEST_ON_SUCCESS,
  REQUEST_ON_PENDING  
} from '../constants';

const initialState = {
  pending: false,
  robots: [],
  error: ''
}

export const requestRobots = (state = initialState, action = {}) => {
  switch(action.type) {
    case REQUEST_ON_PENDING:
      return { ...state, pending: action.payload }
    case REQUEST_ON_SUCCESS:
      return { ...state, robots: action.payload }
    case REQUEST_ON_FAILED: 
      return { ...state, error: action.payload }
    default:
      return state
  }
}
