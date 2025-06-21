import type {CartItem} from "../model/CartItem.ts";
import {createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../model/ProductData.ts";

interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItemToCart(state: CartState,
                      action: ReturnType<ProductData>) {
            const existingItem =
                state.items.find((item) =>
                         item.product.id === action.payload.id);
            if (!existingItem) {
                state.items.push({
                    product: action.payload,
                    itemCount: 1
                })
            }
        }
    }
});

export const {addItemToCart}
    = cartSlice.actions;
export default cartSlice.reducer;