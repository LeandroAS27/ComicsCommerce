import { FETCH_COMICS_SUCCESS, FETCH_COMICS_ERROR } from "../actions/actionTypes";

interface Thumbnail {
    path: string;
    extension: string;
}

interface Comic {
    id: number;
    title: string;
    thumbnail: Thumbnail;
}

interface State{
    products: Comic[];
    error: string | null;
    loading: boolean;
}

const intialState: State = {
    products: [],
    error: null,
    loading: false,
}

const DataFetchReducer = (state = intialState, action: any): State => {
    switch (action.type) {
        case 'FETCH_COMICS_SUCCESS':
            return {...state, products: action.payload, loading: false, error: null};     

        case 'FETCH_COMICS_ERROR':
            return {...state, error: action.payload, loading:false};
        default:
            return state;
    }
}

export default DataFetchReducer;