1. To, integrate `Redux`, let's install the following necessary dependencies.
```shell
npm install redux react-redux
npm install @reduxjs/toolkit
```
2. Now, let's create the `store.ts` inside a folder called `store` inside `src` folder.
```typescript
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
3. Also, let's provide the `store` to the `Provider` in `main.tsx` file.
```typescript jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
```
4. Also, let's update our model `Product.tsx` as below to include all fields.
```typescript
export interface ProductData {
    id: number,
    name: string,
    price: number,
    currency: string,
    image: string
}
```
5. Now, let's create a new folder called `slices` and extract out the functionality from the `Home.tsx` into `productSlice.ts` inside that.
```typescript
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

interface ProductsState {
 list: [];
 error: string | null | undefined;
}

const initialState: ProductsState = {
 list: [],
 error: null
};

export const getAllProducts = createAsyncThunk(
        'products/getAllProducts',
        async () => {
         const response = await fetch('./product-data.json');
         return await response.json();
        }
);

const productsSlice = createSlice({
 name: 'products',
 initialState: initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
          // Async Response Pending State
          .addCase(getAllProducts.pending,
                  () => {
              alert("Products are still loading..")
          })
          // Async Response Complete State
          .addCase(getAllProducts.fulfilled,
                  (state, action) => {
              state.list = action.payload;
          })
          // Async Response Failure State
          .addCase(getAllProducts.rejected,
                  (state, action) => {
             state.error = action.error.message;
             alert("Error: " + state.error)
          });
 }
});

export default productsSlice.reducer;
```
6. Now, let's update `store.ts` as below to keep `Products` related details.
```typescript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './../slices/productSlice';
import cartReducer from './../slices/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```