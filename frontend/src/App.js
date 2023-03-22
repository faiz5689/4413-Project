import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Checkout from './pages/checkout/checkout';
import Chat from './Component/Chat';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Header from './Component/navbar/Header';
import Products from './pages/products';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <a href="/">Home</a>
        <hr/>
        <a href="/checkout">Checkout</a>
        <hr/>
        <a href="/login">Login</a>
      </header> */}
      
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/checkout' component={Checkout}/>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<Products/>}/>
        </Routes>
      </BrowserRouter>

      <Chat />
    </div>
  );
}

export default App;
