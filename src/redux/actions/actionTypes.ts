import { Dispatch } from "redux";
import axios from "axios";
import CryptoJS from 'crypto-js';

export const FETCH_COMICS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_COMICS_ERROR = "FETCH_PRODUCTS_ERROR";


export const fetchComicsSucess = (comics:Comic[]) => ({
    type: 'FETCH_COMICS_SUCCESS',
    payload: comics,
})

export const fetchComicsError = (error:string) => ({
    type: 'FETCH_COMICS_ERROR',
    payload: error,
})

export const fetchProducts = () => {
    return async (dispatch: Dispatch) => {
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
            dispatch({type: FETCH_COMICS_SUCCESS, payload: response.data.data.results,});
            console.log(response.data.data.results)
        } catch (error) {
            dispatch({type: FETCH_COMICS_ERROR, payload: error.message,})
        }
    }
    
}