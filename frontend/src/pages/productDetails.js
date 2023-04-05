import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/product.actions.js';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

export default function ProductDetails(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // Log the entire Redux state
  const state = useSelector((state) => state);
  console.log('Redux state:', state);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = async () => {
    //userInfo: id, username, isAdmin, loyaltypoints
    var user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      try {
        const { data } = await axios.post(
          `${API_URL}/add-to-cart/${user._id}`,
          {
            id: productId,
          }
        );
        alert('Item added to cart!');
      } catch (error) {
        alert('Error adding item to cart.');
      }
    } else {
      console.log("We're here");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div className="container">
          <div class="left-side">
            <img className="large" src={product.image} alt={product.name} />
          </div>

          <div class="right-side">
            <div class="product-description">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
            <span>Colour: {product.colour}</span>
            <div className="category">
              <span>Category: {product.category}</span>
            </div>
            <div className="brand">
              <span>Brand: {product.brand}</span>
            </div>
            <div className="in-stock">
              <span>
                In Stock:{' '}
                {product.numberInStock > 0 ? <span>Yes</span> : <span>No</span>}
              </span>
            </div>
            <div className="loyalty-points">
              <span>Loyalty Points: {product.loyaltyValue}</span>
            </div>
            <div className="rating">
              <span>Rating: {product.rating}</span>
            </div>

            <div class="product-price">
              <span>${product.price}</span>
              <button class="cart-btn" onClick={addToCartHandler}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
