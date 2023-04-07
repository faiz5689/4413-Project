import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import ReactAppContainer from 'react-app-container';
// import { GlassArView } from '@lastcode802/glassarview';

export default function Product(props) {
  const { product } = props;
  // const jeelizvto = () => {
  //   render(
  //     <ReactAppContainer>
  //       <GlassArView
  //         modelname={`${product.sku}`}
  //         canvasheight={500}
  //         canvaswidth={500}
  //       />
  //     </ReactAppContainer>,
  //     document.querySelector('#root')
  //   );
  // };

  return (
    <div className="container">
      <div key={product._id} className="card custom-card">
        <Link to={`/products/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/products/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <div className="row">
            <div className="price">${product.price}</div>
            {/* <button onClick={jeelizvto}>Try-On</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
