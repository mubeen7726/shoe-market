


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../store/productSlice';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Table, Button, Container } from 'react-bootstrap';
// import {  } from "./cart.css";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(storedCart);
//   }, []);

//   const totalPrice = cartItems.reduce((total, item) => {
//     const price = Number(item.price) || 0;
//     const quantity = item.quantity || 0; 
//     return total + price * quantity; 
//   }, 0);

//   const handleRemoveFromCart = (id) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
    
//     dispatch(removeFromCart(id)); 
//     toast.error(`Item removed from cart!`); 
//   };
  
//   const handleIncreaseQuantity = (id) => {
//     const updatedCart = cartItems.map(item => {
//       if (item.id === id) {
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     });
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); 
//   };

//   const handleDecreaseQuantity = (id) => {
//     const updatedCart = cartItems.map(item => {
//       if (item.id === id && item.quantity > 1) {
//         return { ...item, quantity: item.quantity - 1 };
//       }
//       return item;
//     });
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="text-center mb-4">Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map(item => (
//               <tr key={item.id}>
//                 <td>
//                   <img 
//                     src={item.picture} 
//                     alt={item.name} 
//                     style={{ height: '50px', width: '50px', objectFit: 'contain' }}
//                   />
//                 </td>
//                 <td>{item.name}</td>
//                 <td>${Number(item.price).toFixed(2)}</td>
//                 <td>
//                   <Button onClick={() => handleDecreaseQuantity(item.id)} className='minus-button'>-</Button>
//                   <span className="mx-2">{item.quantity}</span>
//                   <Button  onClick={() => handleIncreaseQuantity(item.id)} >+</Button>
//                 </td>
//                 <td>
//                   <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
//                    x
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <h2 className="text-center text-muted">Your cart is empty</h2>
//       )}
//       {cartItems.length > 0 && (
//         <div className="mt-4 text-end">
//           <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
//         </div>
//       )}
//       <ToastContainer position="bottom-center" autoClose={3000} /> 
//     </Container>
//   );
// };

// export default Cart;




'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/productSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Container } from 'react-bootstrap';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = item.quantity || 0; 
    return total + price * quantity; 
  }, 0);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    dispatch(removeFromCart(id)); 
    toast.error(`Item removed from cart!`); 
  };
  
  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              const itemTotalPrice = (Number(item.price) || 0) * (item.quantity || 0);
              return (
                <tr key={item.id}>
                  <td>
                    <img 
                      src={item.picture} 
                      alt={item.name} 
                      style={{ height: '50px', width: '50px', objectFit: 'contain' }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>
                    <Button onClick={() => handleDecreaseQuantity(item.id)} className='minus-button'>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                  </td>
                  <td>${itemTotalPrice.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                      x
                    </Button>
                  </td>
                </tr>
              );
            })}
            {/* Total Price Row */}
            <tr>
              <td colSpan="4" className="text-end"><strong>Total Price:</strong></td>
              <td colSpan="2">${totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <h2 className="text-center text-muted">Your cart is empty</h2>
      )}
      <ToastContainer position="bottom-center" autoClose={3000} /> 
    </Container>
  );
};

export default Cart;
