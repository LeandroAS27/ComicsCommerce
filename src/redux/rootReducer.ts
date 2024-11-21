import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    someState: someReducer, //aqui fica o reducer
}) 


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;