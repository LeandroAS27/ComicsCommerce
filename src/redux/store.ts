import { configureStore } from '@reduxjs/toolkit';
import comicsReducer from './slice/comicsSlice.reducer';

export const store = configureStore({
    reducer: {
        comics: comicsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;