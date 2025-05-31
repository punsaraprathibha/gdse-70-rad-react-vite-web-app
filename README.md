52. Let's delete the `Navbar.css` file as we no longer need it and add the tailwind inline css to `Navbar.tsx`.
```typescript jsx
<div className="p-2 bg-[#444544] flex justify-between">
 <div className="flex p-2">
  <h1 className="text-2xl text-[#e6f0e6] hover:text-green-400">
   Organic Shop</h1>
  <img className="h-[2rem] w-[2rem] ml-2 pt-1" src={icon}
       alt=""/>
 </div>
 <ul className="list-none flex mt-2 mb-2">
  <li className="mr-2 text-[1.5rem] text-[#e6f0e6] hover:text-green-400">
   <Link to="/">Home</Link>
  </li>
  <li className="mr-2 text-[1.5rem] text-[#e6f0e6] hover:text-green-400">
   <Link to="/about">About</Link>
  </li>
  <li className="mr-2 text-[1.5rem] text-[#e6f0e6] hover:text-green-400">
   <Link to="/contact">Contact</Link>
  </li>
 </ul>
 <button className="text-[1rem] text-[#e6f0e6] bg-[#1f9e4b] pl-4
                               pr-4 rounded-lg border-white border-2 hover:bg-green-400" onClick={onSignInClick}>Sign In</button>
</div>
```
53. Now let's try to design our Home page in `Home.tsx`.
```typescript jsx
export function Home() {
    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5 justify-center items-center mx-auto">
                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    01
                </div>
                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    02
                </div>
                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    03
                </div>

                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    04
                </div>
                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    05
                </div>
                <div className="w-28 h-32 bg-blue-300 mr-2 mb-2 flex justify-center items-center">
                    06
                </div>
            </div>
        </div>
    );
}
```
54. Then let's create grid product items like below.
```typescript jsx
import spinach from '../../../assets/spinach.png';
import tomato from '../../../assets/tomato.png';
import beans from '../../../assets/beans.png';

export function Home() {
    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5 justify-center items-center mx-auto">
                <div className="w-28 h-32 mr-2 mb-2 justify-center items-center border-gray-500 border-[0.5px]">
                    <div>
                        <img className="h-[88px] w-[88px]" src={spinach} alt=""/>
                    </div>
                    <div className="flex">
                        <div>
                            <h3 className="text-[#1f9e4b] text-[12px] pl-2">
                             Spinach</h3>
                        </div>
                        <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                            <h3 className="text-[12px] pl-1">200 <small className="text-[7px]">LKR</small></h3>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-full mt-1 p-[2.4px] bg-[#1f9e4b] text-[8px] border-gray-500 border-[0.5px]">Add to Cart</button>
                    </div>
                </div>

                <div className="w-28 h-32 mr-2 mb-2 justify-center items-center border-gray-500 border-[0.5px]">
                    <div>
                        <img className="h-[88px] w-[88px]" src={tomato} alt=""/>
                    </div>
                    <div className="flex">
                        <div>
                            <h3 className="text-[#1f9e4b] text-[12px] pl-2">Tomato</h3>
                        </div>
                        <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                            <h3 className="text-[12px] pl-1">300 <small className="text-[7px]">LKR</small></h3>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-full mt-1 p-[2.4px] bg-[#1f9e4b] text-[8px] border-gray-500 border-[0.5px]">Add to Cart</button>
                    </div>
                </div>

                <div className="w-28 h-32 mr-2 mb-2 justify-center items-center border-gray-500 border-[0.5px]">
                    <div>
                        <img className="h-[88px] w-[88px]" src={beans} alt=""/>
                    </div>
                    <div className="flex">
                        <div>
                            <h3 className="text-[#1f9e4b] text-[12px] pl-2">Beans</h3>
                        </div>
                        <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                            <h3 className="text-[12px] pl-1">180 <small className="text-[7px]">LKR</small></h3>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-full mt-1 p-[2.4px] bg-[#1f9e4b] text-[8px] border-gray-500 border-[0.5px]">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
55. Now let's see how to load these items dynamically through a json file by extracting this as a new component called "Product".
56. So, create a json file called `product-data.json` inside `public` folder and paste the below code inside it.
```json
[
        {
         "id":  1,
         "name": "Spinach",
         "price": "200",
         "currency": "LKR",
         "image": "spinach.png"
        },
        {
         "id":  2,
         "name": "Tomato",
         "price": "300",
         "currency": "LKR",
         "image": "tomato.png"
        },
        {
         "id":  3,
         "name": "Beans",
         "price": "250",
         "currency": "LKR",
         "image": "beans.png"
        }
]
```
57. Let's extract the product section and create a new common component called `Product`.
```typescript jsx

type ProductData = {
    id: number,
    name: string,
    price: string,
    currency: string,
    image: string
};

type ProductProps = {
    data: ProductData;
};

const images: Record<string, string> = import.meta.glob('../../../assets/*', { eager: true, import: 'default' });

export function Product({ data }: ProductProps) {

    console.log(images);
    console.log(data);
    console.log(`../../../assets/${data.image}`);

    const imageSrc = images[`../../../assets/${data.image}`];

    return (
        <div className="w-28 h-32 mr-2 mb-2 justify-center items-center
        shadow-lg rounded-lg border border-green-200">
            <div>
                <img className="h-[88px] w-[88px]" src={imageSrc} alt=""/>
            </div>
            <div className="flex">
                <div>
                    <h3 className="text-[#1f9e4b] text-[12px] pl-2">{data.name}</h3>
                </div>
                <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
                    <h3 className="text-[12px] pl-1">{data.price} <small className="text-[7px]">{data.currency}</small></h3>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="w-full mt-1 p-[2.4px] bg-[#1f9e4b] text-[10px]
                    shadow-lg rounded-lg border border-green-200 text-white">Add to Cart</button>
            </div>
        </div>
    );
}
```
58. Also update the `Home` component like this.
```typescript jsx
import { useEffect, useState } from 'react';
import {Product} from "../../common/Product/Product.tsx";

type ProductData = {
    id: number;
    name: string;
    price: string;
    currency: string;
    image: string;
};


export function Home() {
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./product-data.json');
                const jsonData = await response.json();
                console.log(jsonData);
                setProducts(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5 justify-center items-center mx-auto">
                {products.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
}
```
59. Let's create a new package called `model` inside `src` folder and create a model called `CartItem.ts` and `ProductModel.ts` to keep our data.
```typescript
import type {ProductModel} from "./ProductModel.ts";

export interface CartItem {
    product: ProductModel,
    itemCount: number
}
```
```typescript
export interface ProductModel {
    id: number,
    name: string,
    price: number,
    currency: string
}
```
60. Now let's create our `ModifyCart` component inside `common` folder.
```typescript jsx
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../model/CartItem";

// Shared static array outside the component
export const itemsList: CartItem[] = [];

interface ModifyCartProps {
 data: any;
}

export const ModifyCart: React.FC<ModifyCartProps> = ({ data }) => {
 const [itemCount, setItemCount] = useState(1);

 useEffect(() => {
  const existingItem = itemsList.find(item => item.product.id === data.product.id);

  if (existingItem) {
   existingItem.itemCount = itemCount;
  } else if (data.isAdded) {
   itemsList.push({ product: data.product, itemCount });
  }
  console.log(itemsList);
 }, [itemCount, data]);

 const onDecreaseItemCount = () => {
  setItemCount(prev => 
          prev > 1 ? prev - 1 
                  : (alert("Item count can't be less than 1"), prev)
  );
 };

 const onIncreaseItemCount = () => {
  setItemCount(prev => prev + 1);
 };

 return (
         <div className="w-full mt-1 p-[2.4px] bg-secondary text-[8px] text-center">
          <button className="float-left text-[8px] bg-yellow-300 rounded-lg h-3 w-4"
                  onClick={onDecreaseItemCount}>-</button>
          <small className="text-[8px]">{itemCount}</small>
          <button className="float-right text-[8px] bg-yellow-300 rounded-lg h-3 w-4"
                  onClick={onIncreaseItemCount}>+</button>
         </div>
 );
};
```
60. Also, now let's update the `Product` component as well to render this `ModifyCart` inside there.
```typescript jsx
import {ModifyCart} from "../ModifyCart/ModifyCart.tsx";
import {useState} from "react";

type ProductData = {
 id: number,
 name: string,
 price: string,
 currency: string,
 image: string
};

type ProductProps = {
 data: ProductData;
};

const images: Record<string, string> = import.meta.glob('../../../assets/*', { eager: true, import: 'default' });

export function Product({ data }: ProductProps) {

 console.log(images);
 console.log(data);
 console.log(`../../../assets/${data.image}`);

 const [isActive, setIsActive] = useState(false);

 const imageSrc = images[`../../../assets/${data.image}`];

 const addToCartOnClick = () => {
  setIsActive(prev => !prev);
 };

 return (
         <div className="w-28 h-32 mr-2 mb-2 justify-center items-center
        shadow-lg rounded-lg border border-green-200">
          <div>
           <img className="h-[88px] w-[88px]" src={imageSrc} alt=""/>
          </div>
          <div className="flex">
           <div>
            <h3 className="text-[#1f9e4b] text-[12px] pl-2">{data.name}</h3>
           </div>
           <div className="bg-yellow-300 ml-1 p-[0.3px] rounded-lg pr-2">
            <h3 className="text-[12px] pl-1">{data.price} <small className="text-[7px]">{data.currency}</small></h3>
           </div>
          </div>
          <div className="flex justify-center">
           {isActive ? (
                   <ModifyCart data={{ product: data, isAdded: isActive }} />
           ) : (
                   <button className="w-full mt-1 p-[2.4px] bg-[#1f9e4b] text-[10px]
                    shadow-lg rounded-lg border border-green-200 text-white"
                           onClick={addToCartOnClick}
                   >Add to Cart</button>
           )}
          </div>
         </div>
 );
}
```