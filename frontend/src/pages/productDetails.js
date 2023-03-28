import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/product.actions.js';

export default function ProductDetails(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div className='container'>
            <div class="left-side">
                <img className="large" src={product.image} alt={product.name} />
            </div>

            <div class="right-side">
                <div class="product-description">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                </div>
                <span>Colour: {product.colour}</span>
                <div className='category'>
                    <span>Category: {product.category}</span>
                </div>
                <div className='brand'>
                    <span>Brand: {product.brand}</span>
                </div>
                <div className='in-stock'>
                    <span>In Stock: {product.numberInStock > 0 ? (<span>Yes</span>) : (<span>No</span>)}</span>
                </div>
                <div className='loyalty-points'>
                    <span>Loyalty Points: {product.loyaltyValue}</span>
                </div>
                <div className='rating'>
                    <span>Rating: {product.rating}</span>
                </div>                

                <div class="product-price">
                    <span>${product.price}</span>
                    <a href="#" class="cart-btn">Add to cart</a>
                </div>
                
   
            </div>   
            

  
        </div>


      )}
    </div>
  );
}