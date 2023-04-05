import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listRecommended } from '../actions/product.actions.js';
import Product from '../Component/Product';
import './Products.css';
import backgroundVideo from '../Component/assets/videoeditedfinal.mp4';

export default function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, products } = productList;
  const recommendedList = useSelector((state) => state.recommendedList);
  const { recomErr, recommended } = recommendedList;

  const [sortFilter, setSortFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [colourFilter, setColourFilter] = useState('');

  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    dispatch(
      listProducts({
        colour: colourFilter,
        brand: brandFilter,
        cat: categoryFilter,
        sort: sortFilter,
      })
    );
    dispatch(listRecommended());
  }, [dispatch, colourFilter, brandFilter, categoryFilter, sortFilter]);

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === 0 ? recommended.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === recommended.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="products-page">
      <div className="filtering-div">
        <div className="sort">
          <label>Sort by: </label>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option value="" selected>
              None
            </option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="-name">Name: Z to A</option>
          </select>
        </div>

        <label className="filter-label">Filter By:</label>
        <div className="colour">
          <select
            value={colourFilter}
            onChange={(e) => setColourFilter(e.target.value)}
          >
            <option value="" selected>
              Colour
            </option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="Gold">Gold</option>
            <option value="Green">Green</option>
            <option value="Grey">Grey</option>
            <option value="Pink">Pink</option>
            <option value="Purple">Purple</option>
            <option value="Silver">Silver</option>
          </select>
        </div>

        <div className="category-filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="" selected>
              Category
            </option>
            <option value="Aviators">Aviator</option>
            <option value="Squared">Squared</option>
            <option value="Classics">Classics</option>
            <option value="Round">Round</option>
          </select>
        </div>

        <div className="brand-filter">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="" selected>
              Brand
            </option>
            <option value="Gucci">Gucci</option>
            <option value="Dior">Dior</option>
            <option value="Nike">Nike</option>
            <option value="Oakley">Oakley</option>
            <option value="Persol">Persol</option>
            <option value="Prada">Prada</option>
            <option value="Ray-Ban">Ray-Ban</option>
            <option value="Quay">Quay</option>
            <option value="Tom Ford">Tom Ford</option>
            <option value="Warby Parker">Warby Parker</option>
          </select>
        </div>
      </div>
      <div className="content-div">
        <div></div>
        <h2 className="headline"> </h2>
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
            <div className="recommended">
              <h2 className="headline">Recommended for you!</h2>
              {recomErr ? (
                <h3>{recomErr}</h3>
              ) : (
                <>
                  {recommended.length === 0}
                  <div className="recommended-slider">
                    <button
                      className="slider-arrow left-arrow"
                      onClick={handlePrevSlide}
                    >
                      ❮
                    </button>
                    {recommended.length > 0 && (
                      <div className="row center">
                        <Product
                          key={recommended[sliderIndex]._id}
                          product={recommended[sliderIndex]}
                        />
                      </div>
                    )}
                    <button
                      className="slider-arrow right-arrow"
                      onClick={handleNextSlide}
                    >
                      ❯
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
