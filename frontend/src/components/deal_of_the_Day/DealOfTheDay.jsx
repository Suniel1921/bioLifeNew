import React, { useEffect, useState } from 'react';
import '../deal_of_the_Day/dealOfTheDay.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCartGlobally } from '../../context/CartContext';

const DealOfTheDay = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const { addToCart } = useCartGlobally();
    
    // Timer
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-07-08T00:00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                hours: 10,
                minutes: 50,
                seconds: 20,
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            // Reset the timer if it has reached zero
            if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                setTimeLeft(calculateTimeLeft());
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
            if (response.data.success) {
                setProducts(response.data.getAllProducts);
                setSelectedProduct(response.data.getAllProducts[0]); // Set the first product as the selected product
                setSelectedImage(response.data.getAllProducts[0].images[0]); // Set the first image as the selected image
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleAddToCart = () => {
        addToCart(selectedProduct);
        toast.success('Item added to cart');
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="deal-of-the-day">
                <div className="deal-info">
                    <div className="deal-text">
                        <p className="deal-only-today">ONLY FOR TODAY</p>
                        <h2 className="deal-title">Deal Of The Day</h2>
                        <p className="deal-description">
                            Deal of the Day for deals on consumer electronics. Watch for many other great daily offers.
                        </p>
                    </div>
                    <div className="deal-timer">
                        <div className="timer-box">
                            <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="timer-label">Hours</span>
                        </div>
                        <div className="timer-box">
                            <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="timer-label">Mins</span>
                        </div>
                        <div className="timer-box">
                            <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="timer-label">Secs</span>
                        </div>
                    </div>
                </div>
                <div className="deal-product">
                    <div className="product-images">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                className="product-thumbnail"
                                src={image}
                                alt={`Product Thumbnail ${index + 1}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                    <div className="product-main">
                        <img className="product-main-image" src={selectedImage} alt="Main Product" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-brand">{selectedProduct.brand.brandName}</h3>
                        <h2 className="product-title">{selectedProduct.name}</h2>
                        <div className="product-rating">
                            <span>⭐⭐⭐⭐⭐</span>
                        </div>
                        <p className="product-price">
                            <span className="product-new-price">${selectedProduct.salePrice}</span>
                            <span className="product-old-price">${selectedProduct.realPrice}</span>
                        </p>
                        <p className="product-features">
                            Fast charging 18W, 50% in 30 min USB Power Delivery 2.0 nQi wireless charging
                        </p>
                        <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealOfTheDay;
