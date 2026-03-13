import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './store';
import CategoryBar from './CategoryBar';

export default function Home() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        const category = params.get('category') || '';
        
        fetch(`http://127.0.0.1:5001/api/products?search=${search}&category=${category}`)
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(() => setProducts([]));
    }, [location.search]);

    const categories = ['Mobiles', 'Laptops', 'Electronics'];

    return (
        <div className="bg-[#f1f3f6] min-h-screen pb-10">
            {/* Top Navigation Elements */}
            <CategoryBar />

            {/* Main Content: Sidebar + Product List */}
            <div className="max-w-[1400px] mx-auto mt-4 flex gap-3 px-2">
                
                {/* Fixed Sidebar */}
                <div className="w-72 bg-white shadow-sm border p-4 sticky top-[80px] h-fit hidden md:block">
                    <h2 className="font-bold border-b pb-3 mb-4 text-lg">Filters</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Categories</p>
                            <label onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer text-sm mb-2">
                                <input type="radio" name="cat" checked={!new URLSearchParams(location.search).get('category')} readOnly /> 
                                <span className="font-medium text-gray-700">All Products</span>
                            </label>
                            {categories.map(c => (
                                <label key={c} onClick={() => navigate(`/?category=${c}`)} className="flex items-center gap-2 cursor-pointer text-sm mb-2">
                                    <input type="radio" name="cat" checked={new URLSearchParams(location.search).get('category') === c} readOnly /> 
                                    <span className="text-gray-700">{c}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product List Rows */}
                <div className="flex-1 bg-white shadow-sm border rounded-sm min-h-[600px]">
                    {products.length === 0 ? (
                        <div className="p-20 text-center text-gray-400">No products found.</div>
                    ) : products.map(p => (
                        <div key={p.id} className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition-all duration-300 group">
                            
                            {/* Image Section */}
                            <div className="w-full md:w-52 flex flex-col items-center gap-4 relative">
                                <div className="h-48 w-full flex items-center justify-center p-2">
                                    <img 
                                        src={p.image_url} 
                                        alt={p.title} 
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex w-full gap-2">
                                    <button 
                                        onClick={() => dispatch(addToCart(p))}
                                        className="flex-1 bg-[#ff9f00] text-white font-bold py-3 rounded-sm text-[10px] shadow-sm uppercase"
                                    >
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => { dispatch(addToCart(p)); navigate('/checkout'); }}
                                        className="flex-1 bg-[#fb641b] text-white font-bold py-3 rounded-sm text-[10px] shadow-sm uppercase"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                            
                            {/* Product Info Section */}
                            <div className="flex-1 pt-2">
                                <h2 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 cursor-pointer">{p.title}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">{p.rating || 4.3} ★</span>
                                    <span className="text-gray-400 text-xs font-bold">({p.reviews || 150} Ratings)</span>
                                </div>
                                <ul className="mt-4 space-y-1 text-sm text-gray-600 list-disc pl-4">
                                    {p.description.split('|').map((desc, i) => (
                                        <li key={i}>{desc.trim()}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Section */}
                            <div className="w-full md:w-48 text-left md:text-right pt-2">
                                <div className="text-2xl font-bold">₹{Number(p.price).toLocaleString('en-IN')}</div>
                                <div className="flex items-center md:justify-end gap-2 mt-1">
                                    <span className="text-gray-500 line-through text-sm">₹{Number(p.original_price).toLocaleString('en-IN')}</span>
                                    <span className="text-green-600 text-xs font-bold">
                                        {Math.round(((p.original_price - p.price) / p.original_price) * 100)}% off
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">Free delivery</div>
                                <div className="text-xs text-green-600 font-bold mt-1">Daily Saver</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}