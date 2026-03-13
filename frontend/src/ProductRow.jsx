import React from 'react';

export default function ProductRow({ title, products }) {
    return (
        <div className="bg-white shadow-sm my-4 border relative">
            <div className="p-4 flex items-center justify-between border-b">
                <h2 className="text-xl font-bold">{title}</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-sm text-sm font-bold shadow">VIEW ALL</button>
            </div>
            <div className="flex overflow-x-auto gap-10 p-6 scrollbar-hide">
                {products.map((p, i) => (
                    <div key={i} className="min-w-[150px] flex flex-col items-center text-center cursor-pointer group">
                        <div className="h-40 w-40 flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform">
                            <img src={p.image_url} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                        <p className="text-sm font-bold text-gray-800 truncate w-full">{p.title}</p>
                        <p className="text-green-600 text-sm mt-1 font-medium">From ₹{p.price}</p>
                        <p className="text-gray-400 text-xs mt-1">{p.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}