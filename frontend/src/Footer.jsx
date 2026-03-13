import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#212121] text-white text-xs mt-10">
            {/* Top Section: Navigation Links */}
            <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-6 gap-8 border-b border-gray-700">
                <div>
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">About</h3>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Flipkart Stories</li>
                        <li>Press</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">Help</h3>
                    <ul className="space-y-2">
                        <li>Payments</li>
                        <li>Shipping</li>
                        <li>Cancellation & Returns</li>
                        <li>FAQ</li>
                        <li>Report Infringement</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">Policy</h3>
                    <ul className="space-y-2">
                        <li>Return Policy</li>
                        <li>Terms Of Use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                        <li>Sitemap</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">Social</h3>
                    <ul className="space-y-2">
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>YouTube</li>
                    </ul>
                </div>
                <div className="border-l border-gray-700 pl-8">
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">Mail Us:</h3>
                    <p className="leading-relaxed">
                        Flipkart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Bengaluru, 560103,<br />
                        Karnataka, India
                    </p>
                </div>
                <div>
                    <h3 className="text-gray-500 mb-3 uppercase font-semibold">Registered Office Address:</h3>
                    <p className="leading-relaxed">
                        Flipkart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Bengaluru, 560103,<br />
                        Karnataka, India<br />
                        CIN : U51109KA2012PTC066107<br />
                        Telephone: 044-45614700
                    </p>
                </div>
            </div>

            {/* Middle Section: Stats & Copyright */}
            <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2"><span className="text-yellow-400">★</span> Become a Seller</span>
                    <span className="flex items-center gap-2"><span className="text-yellow-400">★</span> Advertise</span>
                    <span className="flex items-center gap-2"><span className="text-yellow-400">★</span> Gift Cards</span>
                    <span className="flex items-center gap-2"><span className="text-yellow-400">?</span> Help Center</span>
                </div>
                <div>© 2007-2026 Flipkart.com</div>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payments" />
            </div>

            {/* Bottom Section: SEO Text Area (The massive wall of text from your screenshot) */}
            <div className="bg-white text-gray-500 py-10 px-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    <h1 className="text-lg font-bold text-gray-700">Flipkart: The One-stop Shopping Destination</h1>
                    <p className="leading-relaxed">
                        E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of the latest phone when you can find it on the Internet in a single click? Not only mobiles. Flipkart houses everything you can possibly imagine, from trending electronics like laptops, tablets, smartphones, and mobile accessories to in-vogue fashion staples like shoes, clothing and lifestyle accessories.
                    </p>
                    <h2 className="font-bold text-gray-700">Top Stories: Brand Directory</h2>
                    <p className="text-[10px] leading-loose">
                        MOST SEARCHED IN FASHION: Men's Shirts | Women's Kurtas | Kids Dresses | Watches | Handbags | Shoes | Sunglasses | Jewellery | Perfumes | Belts | Wallets | Socks | Ties | Scarves | Gloves | Winter Wear | Raincoats | Umbrella | Ethnic Wear | Western Wear | Lingerie | Nightwear | Sportswear | Swimwear | Accessories
                    </p>
                    <p className="text-[10px] leading-loose border-t pt-4">
                        <b>Mobiles:</b> iPhone 15 | iPhone 15 Plus | iPhone 14 | iPhone 13 | Samsung S24 | Google Pixel 8 | Motorola G34 | Redmi 13C | Nothing Phone 2a | Vivo T2x | POCO C65 | Realme 12 Plus
                    </p>
                </div>
            </div>
        </footer>
    );
}