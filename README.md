1. Then, let's update the `Home.tsx` as below to call the `productsSlice.ts`.
```typescript jsx
import {useEffect} from "react";
import {Product} from "../../common/Product/Product.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllProducts} from "../../../slices/productsSlice.ts";

export function Home() {
    const dispatch = useDispatch<AppDispatch>(); // Get Dispatch function
    const {list} = useSelector((state: RootState) => state.products); // Get product state from the store

    useEffect(() => {
        dispatch(getAllProducts()); // Trigger Get All Products
    }, []);

    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5
                            justify-center items-center mx-auto">
                {
                    // Loop the products list taken from the store
                    list.map((product) => (
                        <Product key={product.id} data={product}/>
                    ))
                }
            </div>
        </div>
    );
}
```
2. Also, let's update the `Product.tsx` props type to `import type {ProductData} from "../../../model/ProductData.ts";`.
```typescript jsx
import {useState} from "react";
import {ModifyCart} from "../ModifyCart/ModifyCart.tsx";
import type {ProductData} from "../../../model/ProductData.ts";

type ProductProps = {
    data: ProductData
}

const images: Record<string, string>
    = import.meta.glob('../../../assets/products/*',
    {eager: true, import: 'default'});

export function Product({data}: ProductProps) {
    const image = images[`../../../assets/products/${data.image}`];

    const [isActive, setIsActive] = useState(false);
    const addToCart = () => {
        setIsActive(true);
    }

    return (
        <div className="w-32 h-40 mr-2 mb-2 justify-center items-center
                               shadow-lg rounded-lg border border-green-300
                               hover:bg-green-200">
            <div>
                <img className="h-[90px] w-[90px]"
                     src={image} alt=""/>
            </div>
            <div className="flex mt-2">
                <div>
                    <h3 className="text-[#1f9e4b]
                                          text-[14px] pl-2 pr-2">
                        {data.name}</h3>
                </div>
                <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                    <h3 className="text-[12px] pl-1">{data.price}
                        <small className="text-[7px] pl-1">{data.currency}</small></h3>
                </div>
            </div>
            <div className="flex justify-center">
                {
                    isActive ? (
                        <ModifyCart data={data}/>
                    ) : (
                        <button className="w-full mt-4
                            p-[2.4px] bg-[#1f9e4b] text-[12px]
                            text-white border-gray-500 border-[0.5px] rounded-lg h-6
                            cursor-pointer"
                                onClick={addToCart}>Add to Cart
                        </button>
                    )
                }
            </div>
        </div>
    );
}
```
3. As of now, our product listing should work fine in `Home.tsx`.

4. Now, let's define `cartSlice.ts` file inside the `slices` folder by extracting Add/Modify cart related logic.
```typescript
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {CartItem} from "../model/CartItem.ts";
import type {ProductData} from "../model/ProductData.ts";

interface CartState {
 items: CartItem[];
}
const initialState: CartState = {
 items: [],
};
const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  addItemToCart(state: CartState, action: ReturnType<ProductData>) {
     const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
     );
     if (!existingItem) {
         state.items.push({ product: action.payload, itemCount: 1 });
     }
  }
 },
});

export const {  addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
```
5. Now, let's update `store.ts` file as below to keep `ShoppingCart` related details.
```typescript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './../slices/productsSlice';
import cartReducer from './../slices/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
6. Now you can see that there are multiple reducers configured.
    So, here we can extract out reducers for combine them to a separate
    file called `rootReducer.ts` inside `slices`.
```typescript
// rootReducer.ts
import { combineReducers } from 'redux';
import productsReducer from "./productsSlice.ts";
import cartReducer from "./cartSlice.ts";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;
```
and update `store.ts` as below.
```typescript
import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "../slices/rootReducer.ts";

export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```
7. Let's update `Product.tsx` to add new item to cart as below.
```typescript jsx
import { useState } from 'react';
import { ModifyCart } from '../ModifyCart/ModifyCart';
import {addItemToCart} from '../../../slices/cartSlice';
import type {ProductData} from "../../../model/ProductData.ts";
import {useAppDispatch} from "../../../hooks/hooks.ts";

const images = import.meta.glob('../../../assets/products/*', {
    eager: true,
    import: 'default',
});

type ProductProps = {
    data: ProductData
}

export function Product({ data }: ProductProps) {
    const image = images[`../../../assets/products/${data.image}`] as string;
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);

    const addToCart = () => {
        dispatch(addItemToCart(data));
        setIsActive(true);
    };

    return (
        <div className="w-32 h-40 mr-2 mb-2 justify-center items-center
                               shadow-lg rounded-lg border border-green-300
                               hover:bg-green-200">
            <div>
                <img className="h-[90px] w-[90px]"
                     src={image} alt=""/>
            </div>
            <div className="flex mt-2">
                <div>
                    <h3 className="text-[#1f9e4b] text-[14px] pl-2 pr-2">{data.name}</h3>
                </div>
                <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                    <h3 className="text-[12px] pl-1">{data.price}
                        <small className="text-[7px] pl-1">{data.currency}</small></h3>
                </div>
            </div>
            <div className="flex justify-center">
                {
                    isActive ? (
                        <ModifyCart data={data}/>
                    ) : (
                        <button className="w-full mt-4
                            p-[2.4px] bg-[#1f9e4b] text-[12px]
                            text-white border-gray-500 border-[0.5px] rounded-lg h-6
                            cursor-pointer"
                                onClick={addToCart}>Add to Cart
                        </button>
                    )
                }
            </div>
        </div>
    );
}
```
