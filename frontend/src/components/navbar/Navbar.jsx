import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../navbar/navbar.css';
import { useAuthGlobally } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCartGlobally } from '../../context/CartContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { Badge, IconButton } from '@mui/material';
import Search from '../search/Search';

const Navbar = () => {
  const [auth, setAuth] = useAuthGlobally();
  const { cart } = useCartGlobally();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: null
    });
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    toast.success('Logout Successfully');
    navigate('/login');
  };

  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="navbar">

          <div className="logo">
            <Link to={'/'}><img className='logoImg' src="/images/bio_life_Logo.png" alt="Bio Life Logo" /></Link>
          </div>

          <div className='searchComponent'>
          <Search/>
          </div>
        
         <div>
         <ul className='navlinks'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li>
              <NavLink to="/cart">
                <Badge badgeContent={cart.length} color="error">
                  Cart
                </Badge>
              </NavLink>
            </li>

            <li><NavLink to="/blog">Blog</NavLink></li>
            {
              auth?.user ? (
                <div className="navbar-user">
                  <li onClick={handleLogout}><NavLink to="#">Logout</NavLink></li>
                </div>
              ) : (
                <>
                  <li><NavLink to="/login">Login</NavLink></li>
                </>
              )
            }
          </ul>
         </div>
          <p className='hamburgerMenu'><GiHamburgerMenu/></p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;













//testing








// import React, { useEffect, useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { Dropdown, Menu, Badge } from 'antd';
// import { GiHamburgerMenu } from "react-icons/gi";
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useAuthGlobally } from '../../context/AuthContext';
// import { useCartGlobally } from '../../context/CartContext';
// import '../navbar/navbar.css';

// const Navbar = () => {
//   const [auth, setAuth] = useAuthGlobally();
//   const { cart } = useCartGlobally();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
//         if (response.data.success) {
//           // Extract unique categories
//           const uniqueCategories = Array.from(
//             new Set(response.data.getAllProducts.map(product => product.category.categoryName))
//           ).map(name => {
//             return response.data.getAllProducts.find(product => product.category.categoryName === name).category;
//           });

//           setCategories(uniqueCategories);
//           console.log('Unique Categories:', uniqueCategories); 
//         } else {
//           toast.error('Failed to load categories');
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         toast.error('Error fetching categories');
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleLogout = () => {
//     setAuth({
//       user: null,
//       token: null
//     });
//     localStorage.removeItem('token');
//     axios.defaults.headers.common['Authorization'] = null;
//     toast.success('Logout Successfully');
//     navigate('/login');
//   };

//   const categoryMenu = (
//     <Menu>
//       {categories.length > 0 ? (
//         categories.map((category) => (
//           <Menu.Item key={category._id}>
//             <Link to={`/products?category=${category._id}`}>
//               {category.categoryName}
//             </Link>
//           </Menu.Item>
//         ))
//       ) : (
//         <Menu.Item key="no-categories">No Categories Available</Menu.Item>
//       )}
//     </Menu>
//   );
  

//   return (
//     <div className="navbarContainer">
//       <div className="container">
//         <div className="navbar">
//           <div className="logo">
//             <Link to={'/'}><img className='logoImg' src="/images/bio_life_Logo.png" alt="Bio Life Logo" /></Link>
//           </div>
//           <ul className='navlinks'>
//             <li><NavLink to="/">Home</NavLink></li>
//             <li>
//               <Dropdown overlay={categoryMenu} placement="bottomLeft">
//                 <NavLink to="/products">Products</NavLink>
//               </Dropdown>
//             </li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//             <li>
//               <NavLink to="/cart">
//                 <Badge count={cart.length} color="red">
//                   Cart
//                 </Badge>
//               </NavLink>
//             </li>
//             <li><NavLink to="/blog">Blog</NavLink></li>
//             {
//               auth?.user ? (
//                 <div className="navbar-user">
//                   <li onClick={handleLogout}><NavLink to="#">Logout</NavLink></li>
//                 </div>
//               ) : (
//                 <li><NavLink to="/login">Login</NavLink></li>
//               )
//             }
//           </ul>
//           <p className='hamburgerMenu'><GiHamburgerMenu/></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

