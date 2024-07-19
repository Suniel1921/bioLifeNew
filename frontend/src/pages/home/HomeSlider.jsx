
import React from 'react';
import '../home/homeSlider.css';
import { useNavigate } from 'react-router-dom';

const HomeSlider = () => {
    const navigate = useNavigate();
  return (
    <div className="homeSliderContainer">
      <div className="container">
        <div className="banner">
          <div className="content">
            <span className="deal-tag">WEEKEND DEAL</span>
            <h1>All New<br />For A Better You</h1>
            <p>AMAZING DISCOUNTS AND DEALS</p>
            <p className="price"> <span></span></p>
            {/* <p className="price">From <span>Rs.93999</span></p> */}
            <button onClick={()=>navigate('/products')} className="shop-now">SHOP NOW</button>
          </div>
          <div className="images">
            <img src="/images/20.png" alt="Watch 1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;


