// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import '../navbar/navbar.css';
// import { useAuthGlobally } from '../../context/AuthContext';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useCartGlobally } from '../../context/CartContext';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Badge, IconButton } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const Navbar = () => {
//   const [auth, setAuth] = useAuthGlobally();
//   const { cart } = useCartGlobally();
//   const navigate = useNavigate();

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

//   return (
//     <div className="navbarContainer">
//       <div className="container">
//         <div className="navbar">
//           <div className="logo">
//             <Link to={'/'}><img className='logoImg' src="/images/bio_life_Logo.png" alt="Bio Life Logo" /></Link>
//           </div>
//           <ul className='navlinks'>
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/products">Products</NavLink></li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//             <li>
//               <NavLink to="/cart">
//                 <Badge badgeContent={cart.length} color="error">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </NavLink>
//             </li>
//             {
//               auth?.user ? (
//                 <div className="navbar-user">
//                   <li onClick={handleLogout}><NavLink to="#">Logout</NavLink></li>
//                 </div>
//               ) : (
//                 <>
//                   <li><NavLink to="/login">Login</NavLink></li>
//                 </>
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













import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../navbar/navbar.css';
import { useAuthGlobally } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCartGlobally } from '../../context/CartContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { Badge, IconButton } from '@mui/material';

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
          <p className='hamburgerMenu'><GiHamburgerMenu/></p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
