// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import axios from 'axios'; 
// import toast from 'react-hot-toast';
// import '../categoryList/categoryList.css';

// const CategoryList = () => {
//     const [categoryData, setCategoryData] = useState([]);

//     const getAllCategory = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
//             console.log(response);
//             if (response.data.success) {
//                 setCategoryData(response.data.getAllProducts || []); 
//             } else {
//                 toast.error('Failed to fetch categories');
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error('Something went wrong');
//             }
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     return (
//         <div className="categoryListContainer">
//             <div className="container">
//                  <h3 className='categoryHeading'>Categories</h3>
//                 <div className="categoryList">
//                     {categoryData.length > 0 ? (
//                         categoryData.map((cList) => (
//                             <Link className='categoryListName' key={cList._id} to={`/products?category=${cList.category._id}`}>
//                                 <p>{cList.category.categoryName || 'No Name'}</p> 
//                             </Link>
//                         ))
//                     ) : (
//                         <p>No categories available</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryList;







import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../categoryList/categoryList.css';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
                console.log(response);
                if (response.data.success) {
                    const uniqueCategories = response.data.getAllProducts.map(product => product.category)
                        .filter((value, index, self) =>
                            index === self.findIndex((c) => (
                                c.categoryName === value.categoryName
                            ))
                        );
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handlePrevClick = () => {
        setOffset(prevOffset => Math.min(prevOffset + 300, 0));
    };

    const handleNextClick = () => {
        if (containerRef.current) {
            const maxOffset = -containerRef.current.scrollWidth + containerRef.current.clientWidth;
            setOffset(prevOffset => Math.max(prevOffset - 300, maxOffset));
        }
    };

    return (
        <div className="categoryListContainer">
            <button className="slideButton left" onClick={handlePrevClick}>{''}</button>
            <div className="categoryListWrapper" ref={containerRef} style={{ transform: `translateX(${offset}px)` }}>
                <div className="container">
                    <h3 className='categoryHeading homeHeading'>Categories</h3>
                    <div className="categoryList">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category._id} className="categoryItem">
                                    <Link className='categoryListName' to={`/products?category=${category._id}`}>
                                        <img className='categoyListImg' src={category.images[0]} alt={category.categoryName} />
                                        <p>{category.categoryName}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No categories available</p>
                        )}
                    </div>
                </div>
            </div>
            <button className="slideButton right" onClick={handleNextClick}>{''}</button>
        </div>
    );
};

export default CategoryList;
