import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Checkout from './pages/checkout/checkout';
import Chat from './Component/Chat';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Home</a>
        <hr/>
        <a href="/checkout">Checkout</a>
        <hr/>
        <a href="/login">Login</a>
      </header>
  
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      <Chat />
    </div>
  );
}

export default App;
