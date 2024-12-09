import axios, { AxiosError } from "axios";
import CryptoJS from 'crypto-js';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Thumbnail {
    path: string;
    extension: string;
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
    prices?: Price[];
    quantity: number;
}

interface Price{
    price: number;
    type: string;
}

interface State{
    products: Comic[];
    cartItems: CartItem[];
    error: string | null;
    loading: boolean;
    id: number | null;
    isCartOpen: boolean;
    total: number;
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
    total: 0,
}

export const fetchComics = createAsyncThunk<Comic[], void, { rejectValue: string }>(
    'comics/fetchComics',
    async (_, { rejectWithValue }) => {
      try {
        const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
        const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
        const ts = new Date().getTime();
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics`, {
          params: {
            ts,
            apikey: publicKey,
            hash,
          },
        });
  
        return response.data.data.results;
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(
            error.response?.data?.message || error.message || 'Erro desconhecido'
          );
        }
        return rejectWithValue('Erro desconhecido');
      }
    }
  );


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
        },
        incrementQuantity(state, action: PayloadAction<number>){ 
            const item = state.cartItems.find(cartItem => cartItem.id === action.payload);
            if(item){
                item.quantity += 1;
                localStorage.setItem('CartItems', JSON.stringify(state.cartItems));
            }
        },
        removeFromCart(state, action: PayloadAction<number>){ 
            const existingItem = state.cartItems.find(item => item.id === action.payload);
            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                }else{
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
                }
                localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
            }
        },
        calculateTotal(state, action: PayloadAction<number>){
            state.total = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComics.fulfilled, (state, action: PayloadAction<Comic[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchComics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { setId, toggleCart, setCartOpen, addToCart, incrementQuantity, removeFromCart, calculateTotal } = comicsSlice.actions;

export default comicsSlice.reducer;