import type {CartItem} from "../../../model/CartItem.ts";

interface ShoppingCartProps {
    itemsList: CartItem[];
}
export function ShoppingCart({ itemsList }) {
    return (
        <div className="flex justify-center
                       items-center px-4">
            <div className="w-full max-w-screen-xl
                          border border-green-200">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-green-700 text-white">
                            <th className="text-xs font-semibold
                                            border-green-600
                                            border
                                            p-2">Id</th>
                            <th className="text-xs font-semibold
                                            border-green-600
                                            border
                                            p-2">Name</th>
                            <th className="text-xs font-semibold
                                            border-green-600
                                            border
                                            p-2">Unit Price</th>
                            <th className="text-xs font-semibold
                                            border-green-600
                                            border
                                            p-2">Quantity</th>
                            <th className="text-xs font-semibold
                                            border-green-600
                                            border
                                            p-2">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemsList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="
                                    border-green-300  p-2 bg-green-100">
                                        <p className="text-center
                                         text-sm text-white">
                                            No items to Display!</p>
                                    </td>
                                </tr>
                            ) : (

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}