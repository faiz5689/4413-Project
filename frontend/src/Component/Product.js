import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div className='container'>
        <div key={product._id} className="card">
            <Link to={`/products/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name} />
            </Link>
        <div className="card-body">
             <Link to={`/products/${product._id}`}>
                <h2>{product.name}</h2>
            </Link>
            <div className="row">
                <div className="price">${product.price}</div>
            </div>
        </div>
        </div>
    </div>

  );
}