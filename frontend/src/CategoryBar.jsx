import React from 'react';

const categories = [
    { name: 'Mobiles', img: 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
    { name: 'Laptops', img: 'https://rukminim2.flixcart.com/flap/128/128/image/69cffacc2c180911.png' },
    { name: 'Electronics', img: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' }
];

export default function CategoryBar() {
    return (
        <div className="bg-white shadow-sm border-b hidden md:block">
            <div className="max-w-7xl mx-auto flex justify-center gap-20 items-center py-3">
                {categories.map((cat, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group">
                        <img src={cat.img} alt={cat.name} className="w-16 h-16 object-contain" />
                        <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}