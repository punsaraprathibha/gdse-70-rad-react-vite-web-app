8. Now, let's define `cartSlice.ts` file inside the `slices` folder by extracting Add/Modify cart related logic.
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
  },
  increaseQuantity(state: CartState, action: ReturnType<number>) {
   const item = state.items.find((existingItem) =>
           existingItem.product.id === action.payload);
   if (item) {
    item.itemCount += 1
   }
  },
  decreaseQuantity(state: CartState, action: ReturnType<number>) {
   const item = state.items.find((existingItem) =>
           existingItem.product.id === action.payload);
   if (item && item.itemCount > 1) {
    item.itemCount -= 1;
   }
  }
 },
});

export const {  addItemToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
```
9. Now, let's update `ModifyCart.tsx` as below to update the existing item count.
```typescript jsx
import { useState } from "react";
import { decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice";
import {useAppDispatch} from "../../../hooks/hooks.ts";

interface ModifyCartProps {
    data: any;
}

export function ModifyCart({ data }: ModifyCartProps) {
    const [itemCount, setItemCount] = useState(1);
    const dispatch = useAppDispatch();

    const decreaseItemCount = () => {
        if (itemCount > 1) {
            setItemCount((prev) => prev - 1);
            dispatch(decreaseQuantity(data.id));
        } else {
            alert("Item count can't be less than 1");
        }
    };

    const increaseItemCount = () => {
        setItemCount((prev) => prev + 1);
        dispatch(increaseQuantity(data.id));
    };

    return (
        <div className="w-full mt-4 p-[2.4px] text-[8px] text-center">
            <button className="float-left text-[8px] bg-yellow-300 rounded-lg h-5 w-5"
                onClick={decreaseItemCount}>-</button>
            <small className="text-[8px]">{itemCount}</small>
            <button className="float-right text-[8px] bg-yellow-300 rounded-lg h-5 w-5"
                onClick={increaseItemCount}>+</button>
        </div>
    );
}
```
9. Now, we don't have the static array anymore and no need to pass props here to `ShoppingCart`.
```typescript jsx
import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {About} from "../../pages/About/About.tsx";
import {Contact} from "../../pages/Contact/Contact.tsx";
import {ShoppingCart} from "../../pages/ShoppingCart/ShoppingCart.tsx";

export function MainContent() {
    return (
        <div className="flex justify-center
                       items-center min-h-screen">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/shopping-cart" element={<ShoppingCart/>}/>
            </Routes>
        </div>
    );
}
```
10. Then we can update the `ShoppingCart.tsx` as below to display cart items.
```typescript jsx
import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";

export function ShoppingCart() {

    const {items} = useSelector((state: RootState) => state.cart);

    return (
        <div className="flex justify-center
                       items-center px-4">
            <div className="min-w-[70rem] max-w-screen
                          border border-green-200">
                <table className="min-w-full border-collapse">
                    <thead>
                    <tr className="bg-green-700 text-white">
                        <th className="text-2xl font-semibold
                                            border-green-600
                                            border
                                            p-2">Id</th>
                        <th className="text-2xl font-semibold
                                            border-green-600
                                            border
                                            p-2">Name</th>
                        <th className="text-2xl font-semibold
                                            border-green-600
                                            border
                                            p-2">Unit Price</th>
                        <th className="text-2xl font-semibold
                                            border-green-600
                                            border
                                            p-2">Quantity</th>
                        <th className="text-2xl font-semibold
                                            border-green-600
                                            border
                                            p-2">Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="border-green-300 p-2 bg-green-100">
                                    <p className="text-center text-2xl text-green-700">
                                        No items to Display!</p>
                                </td>
                            </tr>
                        ) : (
                            items.map((item, index) => (
                                <tr key={item.product.id}
                                    className={`${index % 2 === 0
                                        ? "bg-green-100"
                                        : "bg-green-200" }
                                           hover:bg-green-300
                                           border border-green-300`}>
                                    <td className="text-2xl
                                                      border-green-300
                                                      border p-2">{item.product.id}</td>
                                    <td className="text-2xl
                                                      border-green-300
                                                      border p-2">{item.product.name}</td>
                                    <td className="text-2xl
                                                      border-green-300
                                                      border p-2">{item.product.price}
                                        {item.product.currency}</td>
                                    <td className="text-2xl
                                                      border-green-300
                                                      border p-2">{item.itemCount}</td>
                                    <td className="text-2xl
                                                      border-green-300
                                                      border p-2">{item.product.price * item.itemCount}
                                        {item.product.currency}</td>
                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
```
11. Also, now we don't need to maintain a separate state in the component itself to keep item count.
    So, let's get the item count from the store as below in `ModifyCart`
```typescript jsx
import { decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks.ts";

interface ModifyCartProps {
    data: any;
}

export function ModifyCart({ data }: ModifyCartProps) {
    const dispatch = useAppDispatch();
    const item = useAppSelector((state) =>
        state.cart.items.find(cartItem => cartItem.product.id === data.id)
    );

    const decreaseItemCount = () => {
        if (item?.itemCount && item.itemCount > 1) {
            dispatch(decreaseQuantity(data.id));
        } else {
            alert("Item count can't be less than 1");
        }
    };

    const increaseItemCount = () => {
        dispatch(increaseQuantity(data.id));
    };

    return (
        <div className="w-full mt-4 p-[2.4px] text-[8px] text-center">
            <button className="float-left text-[8px] bg-yellow-300 rounded-lg h-5 w-5"
                onClick={decreaseItemCount}>-</button>
            <small className="text-[8px]">{item?.itemCount}</small>
            <button className="float-right text-[8px] bg-yellow-300 rounded-lg h-5 w-5"
                onClick={increaseItemCount}>+</button>
        </div>
    );
}
```
12. Also, furthermore we don't need to maintain a separate state called `isActive` to show/hide `Add to Cart` button and `Modify Cart`.
    So, let's update it as follows.
```typescript jsx
import {useState} from "react";
import {ModifyCart} from "../ModifyCart/ModifyCart.tsx";
import type {ProductData} from "../../../model/ProductData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {addItemToCart} from "../../../slices/cartSlice.ts";

type ProductProps = {
    data: ProductData
}

const images: Record<string, string>
    = import.meta.glob(
    '../../../assets/products/*',
    {eager: true, import: 'default'});

export function Product({data}: ProductProps) {
    const image = images[`../../../assets/products/${data.image}`];
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state) =>
        state.cart.items.find(cartItem => cartItem.product.id === data.id)
    );

    const addToCart = () => {
        dispatch(addItemToCart(data));
    };

    return (
        <div className="w-[14rem] h-[17.2rem] mr-2 mb-2 justify-center items-center
                               shadow-lg rounded-lg border border-green-300
                               hover:bg-green-200">
            <div>
                <img className="h-[10rem] w-[10rem]"
                     src={image} alt=""/>
            </div>
            <div className="flex mt-2">
                <div>
                    <h3 className="text-[#1f9e4b]
                                          text-[2rem] pl-2 pr-2">
                        {data.name}</h3>
                </div>
                <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                    <h3 className="text-[1.4rem] pl-1">{data.price}
                        <small className="text-[0.8rem] pl-1">{data.currency}</small></h3>
                </div>
            </div>
            <div className="flex justify-center">
                {
                    item ? (
                        <ModifyCart data={data}/>
                    ) : (
                        <button className="w-full mt-4
                            p-[0.5rem] bg-[#1f9e4b] text-[1rem]
                            text-white border-gray-500 border-[0.5px] rounded-lg
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