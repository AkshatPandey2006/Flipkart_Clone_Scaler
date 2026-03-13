import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store';

export default function Navbar() {
    const { items } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <nav className="bg-[#2874f0] text-white p-2 md:p-3 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-6">
                <Link to="/" className="font-bold italic text-lg md:text-xl">Flipkart</Link>
                
                <input 
                    type="text" placeholder="Search..." 
                    className="hidden md:block flex-1 max-w-xl p-2 rounded-sm text-black outline-none" 
                    onChange={(e) => navigate(`/?search=${e.target.value}`)}
                />

                <div className="flex items-center gap-3 md:gap-8 text-sm font-bold">
                    {userInfo ? (
                        <div className="group relative cursor-pointer">
                            <span>{userInfo.name}</span>
                            <div className="hidden group-hover:block absolute top-full right-0 bg-white text-black shadow-lg w-40 p-2 rounded-sm font-normal">
                                <Link to="/orders" className="block p-2 hover:bg-gray-100">Orders</Link>
                                <button onClick={() => dispatch(logout())} className="block w-full text-left p-2 hover:bg-gray-100">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-white text-[#2874f0] px-6 py-1 rounded-sm">Login</Link>
                    )}
                    <Link to="/cart" className="relative">
                        Cart {items.length > 0 && <span className="absolute -top-2 -right-3 bg-red-600 px-1 rounded-full text-[10px]">{items.length}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}