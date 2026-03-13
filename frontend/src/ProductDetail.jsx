import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './store';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5001/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setMainImage(data.image_url);
                let extraImages = [];
                try {
                    extraImages = typeof data.additional_images === 'string' 
                        ? JSON.parse(data.additional_images) 
                        : data.additional_images || [];
                } catch(e) { console.error("Error parsing images", e); }
                
                setImages([data.image_url, ...extraImages]);
            });
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleBuyNow = () => {
        dispatch(addToCart(product));
        navigate('/cart');
    };

    if (!product) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6 bg-white mt-4 shadow-sm rounded-sm">
            <div className="w-full md:w-2/5 flex flex-col gap-4 sticky top-20 h-max">
                <div className="flex gap-2 h-[450px]">
                    <div className="flex flex-col gap-2 overflow-y-auto w-16">
                        {images.map((img, idx) => (
                            <img 
                                key={idx} src={img} alt="thumbnail" 
                                className={`border p-1 cursor-pointer hover:border-[#2874f0] ${mainImage === img ? 'border-[#2874f0]' : 'border-gray-200'}`}
                                onMouseEnter={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className="flex-1 border border-gray-100 flex items-center justify-center p-4">
                        <img src={mainImage} alt={product.title} className="max-h-full object-contain" />
                    </div>
                </div>
                <div className="flex gap-4 font-bold text-white">
                    <button onClick={handleAddToCart} className="flex-1 bg-[#ff9f00] py-4 rounded-sm shadow text-lg uppercase flex justify-center items-center gap-2">
                        Add to Cart
                    </button>
                    <button onClick={handleBuyNow} className="flex-1 bg-[#fb641b] py-4 rounded-sm shadow text-lg uppercase flex justify-center items-center gap-2">
                        Buy Now
                    </button>
                </div>
            </div>

            <div className="w-full md:w-3/5 p-4">
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <h1 className="text-xl text-gray-900 font-medium">{product.title}</h1>
                <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500 line-through">₹{product.original_price.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                </div>
            </div>
        </div>
    );
}