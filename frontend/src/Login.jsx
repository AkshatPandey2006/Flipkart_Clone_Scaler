import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignup ? 'signup' : 'login';
        try {
            const res = await fetch(`http://127.0.0.1:5001/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                dispatch(setUser(data.user));
                navigate('/');
            } else {
                alert(data.error || "Authentication failed");
            }
        } catch (err) {
            alert("Backend is not responding. Check your terminal!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row shadow-lg rounded-sm overflow-hidden bg-white">
            <div className="bg-[#2874f0] text-white p-10 md:w-2/5 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
                    <p className="text-gray-200">Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Flipkart Login" />
            </div>
            <div className="p-10 md:w-3/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignup && (
                        <input required type="text" placeholder="Full Name" className="w-full border-b p-2 outline-none focus:border-[#2874f0]" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    )}
                    <input required type="email" placeholder="Email" className="w-full border-b p-2 outline-none focus:border-[#2874f0]" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="password" placeholder="Password" className="w-full border-b p-2 outline-none focus:border-[#2874f0]" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <button className="w-full bg-[#fb641b] text-white py-3 font-bold uppercase shadow">{isSignup ? "Create Account" : "Login"}</button>
                </form>
                <button onClick={() => setIsSignup(!isSignup)} className="w-full text-[#2874f0] font-bold mt-6 text-sm">
                    {isSignup ? "Existing User? Log in" : "New to Flipkart? Create an account"}
                </button>
            </div>
        </div>
    );
}