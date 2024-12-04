import axios from "axios";
import CryptoJS from 'crypto-js';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Thumbnail {
    path: string;
    extension: string;
}

interface Price{
    type: string;
    price: number;
}

interface Comic {
    id: number;
    title: string;
    thumbnail: Thumbnail;
    prices: Price[];
}

interface CartItem{
    id: number;
    title: string;
    thumbnail: Thumbnail;
    prices: Price[];
    quantity: number;
}

interface State{
    products: Comic[];
    cartItems: CartItem[];
    error: string | null;
    loading: boolean;
    id: number | null,
    isCartOpen: boolean,
}

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('CartItems');
    if(storedCart){
        return JSON.parse(storedCart)
    }
    return [];
}
const initialState: State = {
    products: [],
    cartItems: loadCartFromLocalStorage(),
    error: null,
    loading: false,
    id: null,
    isCartOpen: false,
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
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        toggleCart(state){
            state.isCartOpen = !state.isCartOpen;
        },
        setCartOpen(state, action: PayloadAction<boolean>){
            state.isCartOpen = action.payload
        },
        addToCart(state, action: PayloadAction<CartItem>){
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.cartItems.push(action.payload)
            }
            localStorage.setItem('CartItems', JSON.stringify(state.cartItems));
        }
    },
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

export const { setId, toggleCart, setCartOpen, addToCart } = comicsSlice.actions;

export default comicsSlice.reducer;