01. Now, let's do the frontend and backend integration.
02. For that we need to install `axios` dependency.
```shell
npm i axios
```
03. Firstly let's create a new file called `api.ts` to include base URL of our backend app for reuse again and again.
```typescript
import axios from "axios";

export const backendApi = axios.create(
    {baseURL: "http://localhost:3000"}
);
```
04. So, firstly let's start with the product listing in `Home.tsx` by changing the logic in `productsSlice.ts`.
```typescript
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../model/ProductData.ts";
import {backendApi} from "../api.ts";

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
        const response = await backendApi.get("/products/all");
        return response.data;
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
            (state: ProductState, action: ReturnType<ProductData[]>): void => {
                state.list = action.payload;
            }).addCase(getAllProducts.rejected,
            (state: ProductState, action: ReturnType<typeof getAllProducts.rejected.type>): void => {
                state.error = action.error.message;
                alert("Error loading: " + state.error);
            })
    }
});
export default productSlice.reducer;
```
05. But, unfortunately we've an error in our browser console after this.
    We call this as `CORS` (Cross Origin Resource Sharing) issue.
```
Access to XMLHttpRequest at 'http://localhost:3000/products/all' 
from origin 'http://localhost:5173' has been blocked by 
CORS policy: No 'Access-Control-Allow-Origin' header is present 
on the requested resource.
```
06. So, we have to enable it from the backend.
07. Then after that we're able to access the backend from our frontend.