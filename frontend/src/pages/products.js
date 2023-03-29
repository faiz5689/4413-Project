import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listRecommended } from '../actions/product.actions.js';
import Product from '../Component/Product';

export default function Products (){

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, products } = productList;
    const recommendedList = useSelector((state) => state.recommendedList);
    const { recomErr, recommended } = recommendedList;

    useEffect(() => {
      dispatch(listProducts({}));
      dispatch(listRecommended());
    }, [dispatch]);
    return (
   <div>
    <div className='recommended'>
        <h2 className='headline'>Recommended for you!</h2>
        {recomErr ? 
        (<h3>{recomErr}</h3>) :
        (<>
            {recommended.length === 0 && <h3>No Recommended Product Found</h3>}
            <div className="row center">
              {recommended.map((recom) => (
                <Product key={recom._id} product={recom}></Product>
              ))}
            </div>
        </>
        )}
    </div>
    <div>
        
    </div>
      <h2 className='headline'>All Products</h2>
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
