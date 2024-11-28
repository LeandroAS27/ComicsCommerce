import axios from "axios";
import CryptoJS from 'crypto-js';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const initialState: State = {
    products: [],
    error: null,
    loading: false,
}

export const fetchComics = createAsyncThunk(
    'comics/fetchComics',
    async(_, {rejectWithValue}) => {
        try {
            const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
            const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
            const ts = new Date().getTime();
            const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics`,{
                params: {
                    ts,
                    apikey: publicKey,
                    hash,
                },
            })
            return response.data.data.results;
        } catch (error:any) {
            return rejectWithValue(error.message?.data?.message || error.message || 'Erro desconhecido')
        }
    }
)

const comicsSlice = createSlice({
    name: 'comics',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComics.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchComics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default comicsSlice.reducer;