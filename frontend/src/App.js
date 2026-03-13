import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
import Orders from './Orders';
import Login from './Login';
import Footer from './Footer'; // Ensure you created Footer.jsx

function App() {
  return (
    <BrowserRouter>
      {/* min-h-screen: Ensures the container is at least the height of the screen.
          flex-col: Allows us to use flex-grow on the content.
      */}
      <div className="min-h-screen flex flex-col bg-[#f1f3f6]">
        
        {/* Navigation Bar - Stays at top */}
        <Navbar />

        {/* Main Content Area 
            flex-grow: This pushes the footer to the very bottom 
            even if the page (like an empty cart) has almost no content.
        */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Footer - Stays at bottom */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;