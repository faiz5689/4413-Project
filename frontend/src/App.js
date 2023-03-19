import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Checkout from './pages/checkout/checkout';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Home</a>
        <hr/>
        <a href="/checkout">Checkout</a>
      </header>
  
      <main>list products!! Diego testing again</main>
    
      
      <BrowserRouter>
      <Routes>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
