import {useEffect, useState} from "react";
import {Product} from "../../common/Product/Product.tsx";

export function Home() {
    const [products, setProducts]
        = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./product-data.json');
                const jsonData = await response.json();
                // console.log(jsonData);
                setProducts(jsonData);
            } catch (error) {
                console.error('Error fetching data: ',
                    error)
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5
                            justify-center items-center mx-auto">
                {
                    products.map((product) => (
                        <Product data={product}/>
                    ))
                }
            </div>
        </div>
    );
}