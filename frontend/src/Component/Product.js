import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import ReactAppContainer from 'react-app-container';
import { GlassArView } from '@lastcode802/glassarview';

import '../index.css';

export default function Product(props) {
  const { product } = props;
  const jeelizvto = () => {
    render(
      <ReactAppContainer>
        <GlassArView
          modelname={`${product.sku}`}
          canvasheight={500}
          canvaswidth={500}
        />
      </ReactAppContainer>,
      document.querySelector('#root')
    );
  };

  return (
    <div className="container">
      <div key={product._id} className="card custom-card">
        <Link to={`/products/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link
            to={`/products/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
            <h2
              style={{
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                color: '#333',
                fontWeight: 'bold',
              }}
            >
              {product.name}
            </h2>
          </Link>
          <div className="row">
            <div className="price">${product.price}</div>
            <button
              onClick={jeelizvto}
              style={{
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                backgroundColor: '#7865f5',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#4E2A84')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#7865f5')}
            >
              Try-On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
