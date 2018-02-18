import { combineReducers } from 'redux';

import authReducer from './reducer-auth';
import { reducer as form } from 'redux-form';


const allReducers = combineReducers({

    auth: authReducer,
    form
});

export default allReducers;
