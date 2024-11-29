import { combineReducers } from 'redux';
import DataFetchReducer from './reducers/dataReducer';

const rootReducer = combineReducers({
    data: DataFetchReducer, //aqui fica o reducer
}) 


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;