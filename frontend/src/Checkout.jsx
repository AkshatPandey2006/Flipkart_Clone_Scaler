import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './store'; // Ensure this action exists in your store

export default function Checkout() {
    const { items } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        address: '',
        phone: ''
    });

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true);

        const orderData = {
            total: totalAmount,
            name: formData.name,
            address: formData.address,
            userId: userInfo?.id || null,
            items: items.map(item => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity
            }))
        };

        try {
            const res = await fetch('http://localhost:5001/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert(`✅ Order Placed Successfully! Order ID: ${data.orderId}`);
                dispatch(clearCart());
                navigate('/');
            } else {
                alert("❌ Error: " + (data.error || "Could not place order"));
            }
        } catch (err) {
            console.error("Checkout Error:", err);
            alert("❌ Network Error: Is your backend running at http://localhost:5001?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                
                {/* Delivery Address Form */}
                <div className="flex-1 bg-white p-6 shadow-sm rounded-sm">
                    <h2 className="text-lg font-bold mb-6 text-blue-600 uppercase border-b pb-2">Delivery Address</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                            type="text" required placeholder="Full Name"
                            className="w-full border p-3 rounded-sm outline-none focus:border-blue-500"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <textarea 
                            required placeholder="Detailed Address (Area and Street)"
                            className="w-full border p-3 rounded-sm h-32 outline-none focus:border-blue-500"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        ></textarea>
                        <input 
                            type="text" required placeholder="10-digit mobile number"
                            className="w-full border p-3 rounded-sm outline-none focus:border-blue-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-4 text-white font-bold rounded-sm shadow-md transition-all ${loading ? 'bg-gray-400' : 'bg-[#fb641b] hover:bg-[#e65a16]'}`}
                        >
                            {loading ? "PROCESSING..." : "CONFIRM ORDER"}
                        </button>
                    </form>
                </div>

                {/* Price Details Side Panel */}
                <div className="w-full md:w-80 bg-white p-6 shadow-sm rounded-sm h-fit">
                    <h2 className="text-gray-500 font-bold border-b pb-3 mb-4 uppercase">Price Details</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span>Price ({items.length} items)</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span className="text-green-600 font-medium font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-dashed pt-4">
                            <span>Amount Payable</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}