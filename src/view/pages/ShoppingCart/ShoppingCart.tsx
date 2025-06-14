import type {CartItem} from "../../../model/CartItem.ts";

interface ShoppingCartProps {
    itemsList: CartItem[];
}
export function ShoppingCart({ itemsList } : ShoppingCartProps) {
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
                            itemsList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="border-green-300 p-2 bg-green-100">
                                        <p className="text-center text-2xl text-green-700">
                                            No items to Display!</p>
                                    </td>
                                </tr>
                            ) : (
                                itemsList.map((item, index) => (
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