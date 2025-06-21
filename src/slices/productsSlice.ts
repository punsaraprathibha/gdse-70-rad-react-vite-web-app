import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../model/ProductData.ts";

interface ProductState {
    list: ProductData[],
    error: string | null | undefined
}

const initialState: ProductState = {
    list: [],
    error: null
}

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async () => {
        const response = await fetch('./product-data.json');
        return await response.json();
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending,
            () => {
                alert("Products are still loading..");
            }).addCase(getAllProducts.fulfilled,
            (state, action) => {
                state.list = action.payload;
            }).addCase(getAllProducts.rejected,
            (state, action) => {
                state.error = action.error.message;
                alert("Error loading: " + state.error)
            })
    }
});
export default productSlice.reducer;