import type {ProductData} from "./ProductData.ts";

export interface CartItem {
    product: ProductData,
    itemCount: number
}