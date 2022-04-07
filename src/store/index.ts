import { configureStore } from '@reduxjs/toolkit'
import bank from './bank';
import distribution from './distribution';
import staking from './staking';
import tx from './tx';
import wallet from './wallet';

export const store = configureStore({
    reducer: {
        wallet: wallet,
        staking,
        distribution: distribution,
        bank: bank,
        tx: tx
    },
    middleware: gmd => gmd({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch