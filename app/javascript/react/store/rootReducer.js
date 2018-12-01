import { combineReducers } from 'redux';

import { cohorts } from '../modules/cohorts';

let rootReducer = combineReducers({
  cohorts
});

export default rootReducer;
