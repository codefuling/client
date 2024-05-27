import { combineReducers } from 'redux'
import todo from './todo'
import user from './user'


const rootReducer = combineReducers({
    user,
    todo
});

export default rootReducer;