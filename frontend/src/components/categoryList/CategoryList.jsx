// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; 
// import toast from 'react-hot-toast';
// import '../categoryList/categoryList.css'

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
//                 <div className="categoryList">
//                     {categoryData.length > 0 ? (
//                         categoryData.map((cList) => (
//                             <p key={cList._id}>{cList.category.categoryName || 'No Name'}</p> 
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









import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios'; 
import toast from 'react-hot-toast';
import '../categoryList/categoryList.css';

const CategoryList = () => {
    const [categoryData, setCategoryData] = useState([]);

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
            console.log(response);
            if (response.data.success) {
                setCategoryData(response.data.getAllProducts || []); 
            } else {
                toast.error('Failed to fetch categories');
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
        getAllCategory();
    }, []);

    return (
        <div className="categoryListContainer">
            <div className="container">
                 <h3 className='categoryHeading'>Categories</h3>
                <div className="categoryList">
                    {categoryData.length > 0 ? (
                        categoryData.map((cList) => (
                            <Link className='categoryListName' key={cList._id} to={`/products?category=${cList.category._id}`}>
                                <p>{cList.category.categoryName || 'No Name'}</p> 
                            </Link>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
