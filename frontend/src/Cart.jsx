import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from './store';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { items, totalAmount, totalOriginalPrice } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatPrice = (price) => Number(price || 0).toLocaleString('en-IN');

    if (items.length === 0) {
        return (
            <div className="max-w-5xl mx-auto mt-8 bg-white p-10 flex flex-col items-center shadow-sm">
                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" className="w-64 mb-6" />
                <h2 className="text-xl font-medium mb-2">Your cart is empty!</h2>
                <button onClick={() => navigate('/')} className="bg-[#2874f0] text-white px-16 py-3 font-medium rounded-sm">Shop Now</button>
            </div>
        );
    }

    const discountAmount = totalOriginalPrice - totalAmount;

    return (
        <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row gap-4 items-start pb-10">
            {/* Left Column: List of Items */}
            <div className="w-full md:w-2/3 bg-white shadow-sm rounded-sm">
                <div className="border-b p-4"><h2 className="text-lg font-medium">My Cart ({items.length})</h2></div>
                {items.map(item => (
                    <div key={item.id} className="p-6 border-b flex gap-6">
                        <div className="w-28 flex flex-col items-center gap-4">
                            <img src={item.image_url} alt={item.title} className="h-24 object-contain" />
                            {/* Feature: Update Quantity */}
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => dispatch(updateQuantity({ id: item.id, change: -1 }))}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold"
                                >-</button>
                                <span className="w-10 text-center border py-0.5 text-sm font-medium">{item.quantity}</span>
                                <button 
                                    onClick={() => dispatch(updateQuantity({ id: item.id, change: 1 }))}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold"
                                >+</button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium line-clamp-1">{item.title}</h3>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-gray-500 line-through text-sm">₹{formatPrice(item.original_price)}</span>
                                <span className="text-xl font-bold">₹{formatPrice(item.price)}</span>
                            </div>
                            <div className="mt-6 flex gap-6 font-bold text-gray-700">
                                <button className="hover:text-[#2874f0]">SAVE FOR LATER</button>
                                {/* Feature: Remove Item */}
                                <button onClick={() => dispatch(removeFromCart(item.id))} className="hover:text-[#2874f0]">REMOVE</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="p-4 bg-white sticky bottom-0 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-end">
                    <button onClick={() => navigate('/checkout')} className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold text-lg">PLACE ORDER</button>
                </div>
            </div>

            {/* Right Column: Cart Summary (Subtotal & Total) */}
            <div className="w-full md:w-1/3 bg-white shadow-sm rounded-sm sticky top-20">
                <div className="border-b p-4 text-gray-500 font-bold uppercase text-sm">Price Details</div>
                <div className="p-4 space-y-4 border-b">
                    <div className="flex justify-between">
                        <span>Price ({items.length} items)</span>
                        <span>₹{formatPrice(totalOriginalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>− ₹{formatPrice(discountAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-600 font-medium">FREE</span>
                    </div>
                </div>
                <div className="p-4 flex justify-between font-bold text-xl border-b">
                    <span>Total Amount</span>
                    <span>₹{formatPrice(totalAmount)}</span>
                </div>
                <div className="p-4 text-green-600 font-medium text-sm">
                    You will save ₹{formatPrice(discountAmount)} on this order
                </div>
            </div>
        </div>
    );
}