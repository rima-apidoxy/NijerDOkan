import ChangeCurrency from "@/components/changeCurrency/changeCurrency";
import MyOrders from "@/components/myOrders/myOrders";
import OrderDetails from "@/components/orderDetails/orderDetails";
import Wishlist from "@/components/wishlist/wishlist";
import { CircleDollarSign, Heart, LogOut, ShoppingBag, User } from "lucide-react";

export default function MyAccount() {
    return (
        <div className="w-11/12  md:w-10/12  mx-auto py-12 grid grid-cols-1 lg:grid-cols-[30%_70%] min-h-[400px]">
            {/* Left Sidebar */}
            <aside className=" flex flex-col">
                <h2 className="text-2xl font-bold mb-2 border-l-4 border-blue-500 pl-3">Hello Rima</h2>
                <p className="text-gray-600 mb-6">Welcome to your account</p>
                <nav className="flex flex-col gap-4">
                    <div className="text-left text-gray-700 font-semibold text-sm flex gap-2">
                        <ShoppingBag />
                        <h6>My Orders</h6>
                    </div>
                    <div className="text-left text-gray-700 font-semibold text-sm flex gap-2">
                        <Heart />
                        <h6>Wishlist</h6>
                    </div>
                    <div className="text-left text-gray-700 font-semibold text-sm flex gap-2">
                        <CircleDollarSign />
                        <h6>Currency</h6>
                    </div>

                    <div className="text-left text-gray-700 font-semibold text-sm flex gap-2">
                        <User />
                        <h6>My Info</h6>
                    </div>

                    <div className="text-left text-gray-700 font-semibold text-sm flex gap-2">
                        <LogOut />
                        <h6>Sign Out</h6>
                    </div>
                </nav>
            </aside>

            {/* Right Content */}
            <section className="">
                {/* <OrderDetails></OrderDetails> */}
                {/* <MyOrders></MyOrders> */}
                {/* <Wishlist></Wishlist>  */}
                <ChangeCurrency></ChangeCurrency>

            </section>
        </div>
    )
}
