import spinach from
        '../../../assets/products/spinach.png';

export function Home() {
    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5
                            justify-center items-center mx-auto">
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
            </div>
        </div>
    );
}