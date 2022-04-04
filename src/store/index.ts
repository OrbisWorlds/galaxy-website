import { configureStore } from '@reduxjs/toolkit'
import staking from './staking';

export const store = configureStore({
    reducer: {
        staking,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
