import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        if (userInfo) {
            fetch(`http://127.0.0.1:5001/api/orders/${userInfo.id}`)
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [userInfo]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.map(order => (
                <div key={order.id} className="bg-white border mb-6 shadow-sm">
                    <div className="bg-gray-50 p-3 border-b text-xs font-bold text-gray-500 flex justify-between">
                        <span>ORDER PLACED: {new Date(order.date).toLocaleDateString()}</span>
                        <span>ORDER ID: #{order.id}</span>
                    </div>
                    <div className="p-4 space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-center border-b last:border-0 pb-4">
                                <img src={item.image_url} alt="" className="w-20 h-20 object-contain" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{item.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-bold">₹{Number(item.price_at_purchase).toLocaleString('en-IN')}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}