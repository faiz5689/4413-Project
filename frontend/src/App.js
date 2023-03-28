import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Checkout from './pages/checkout/checkout';
import Chat from './Component/Chat';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Header from './Component/navbar/Header';
import Products from './pages/products';
import ContactPage from './pages/contact';
import Cart from './pages/cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>

      <Chat />
    </div>
  );
}

export default App;
