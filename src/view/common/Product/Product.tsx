import {useState} from "react";
import {ModifyCart} from "../ModifyCart/ModifyCart.tsx";

type ProductData = {
    id: number,
    name: string,
    price: string,
    currency: string,
    image: string
}
type ProductProps = {
    data: ProductData
}

const images: Record<string, string>
    = import.meta.glob(
    '../../../assets/products/*',
    {eager: true, import: 'default'});

export function Product({data}: ProductProps) {
    // console.log(images);
    console.log(`../../../assets/products/${data.image}`)

    const image = images[`../../../assets/products/${data.image}`];

    const [isActive, setIsActive]
        = useState(false);
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
                        <ModifyCart data={{
                            product: data
                        }}/>
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