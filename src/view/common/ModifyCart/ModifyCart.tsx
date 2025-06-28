import { useState} from "react";
import type {CartItem} from "../../../model/CartItem.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice.ts";

interface ModifyCartProps {
    data: any
}

export const itemsList:CartItem[] = [];
export function ModifyCart({ data }: ModifyCartProps) {
    const dispatch
        = useDispatch<AppDispatch>();
    const [itemCount, setItemCount]
        = useState(1);

    const decreaseItemCount = () => {
        if (itemCount > 1) {
            setItemCount((prev) => prev - 1);
            dispatch(decreaseQuantity(data.id));
        } else {
            alert("Item Count can't be less than 1");
        }
    }
    const increaseItemCount = () => {
        // setItemCount(prvCount =>
        //     prvCount + 1)
        setItemCount((prev) => prev + 1);
        dispatch(increaseQuantity(data.id));
    }

    return (
        <div className="w-full mt-4 p-[2.4px]
                        text-[8px] text-center">
            <button className="float-left
                 text-[1.2rem] bg-yellow-300
                 rounded-lg h-[2.2rem] w-[2.2rem]"
                 onClick={decreaseItemCount}>-</button>
            <small
                className="text-[1.3rem]">{itemCount}</small>
            <button className="float-right
                 text-[1.2rem] bg-yellow-300
                 rounded-lg h-[2.2rem] w-[2.2rem]"
             onClick={increaseItemCount}>+</button>
        </div>
    );
}