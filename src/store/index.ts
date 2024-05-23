import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
interface Cost {
    title: string;
    amount: number;
    type: string;
    timestamp: number;
}
const globalSlice = createSlice({
    name: "global",
    initialState: {},
    reducers: {
        setGlobal: (state, action: PayloadAction<Record<string, any>>) => ({
            ...state,
            ...action.payload
        })
    }
});

const initialCosts: Cost[] = [];

const costsSlice = createSlice({
    name: "costs",
    initialState: initialCosts,
    reducers: {
        setCosts: (_, action: PayloadAction<any[]>) => [...action.payload]
    }
});

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
        costs: costsSlice.reducer
    },
});

export const { setCosts } = costsSlice.actions;
export const { setGlobal } = globalSlice.actions;