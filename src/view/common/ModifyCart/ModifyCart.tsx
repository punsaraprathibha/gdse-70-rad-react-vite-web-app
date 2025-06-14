import {useEffect, useState} from "react";
import type {CartItem} from "../../../model/CartItem.ts";

interface ModifyCartProps {
    data: any
}

export const itemsList:CartItem[] = [];
export function ModifyCart({ data }: ModifyCartProps) {
    const [itemCount, setItemCount]
        = useState(1);

    useEffect(() => {

        const existingItem = itemsList
            .find(item =>
            item.product.id === data.id);
        if (existingItem) {
            existingItem.itemCount = itemCount;
        } else {
            itemsList.push({
                product: data,
                itemCount: itemCount
            });
        }
        console.log(itemsList);
    }, [itemCount, data])
    const decreaseItemCount = () => {
        setItemCount(prevValue =>
            prevValue > 1
                ? prevValue - 1
                : (alert("Item count can't " +
                        "be less than 1"),
                        prevValue
                )
        )
    }
    const increaseItemCount = () => {
        setItemCount(prvCount =>
            prvCount + 1)
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