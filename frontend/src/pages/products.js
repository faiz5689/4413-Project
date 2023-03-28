import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/product.actions.js';
import Product from '../Component/Product';

export default function Products (){

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, products } = productList;
    localStorage.setItem('prodList', JSON.stringify(productList));
    useEffect(() => {
      dispatch(listProducts({}));
    }, [dispatch]);
    return (
   <div>
      <h2>All Products</h2>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <>
          {products.length === 0 && <h3>No Product Found</h3>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
    );
}
