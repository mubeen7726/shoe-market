"use client";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store/productSlice";
import { useState } from "react";
import { Button, Card, Container, Row, Col, Toast } from "react-bootstrap";
import { urlToUrlWithoutFlightMarker } from "next/dist/client/components/app-router";
import {  } from "./components/imageup/main.css";

export default function Home() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState(""); 
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    
    dispatch(addToCart(productWithQuantity)); 
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemExists = storedCart.some(item => item.id === product.id);

    if (!itemExists) {
      storedCart.push(productWithQuantity); 
      localStorage.setItem('cart', JSON.stringify(storedCart));

      // Show toast
      setToastMessage(`${product.name} has been added to your cart!`);
      setShowToast(true);
    } else {
      setToastMessage(`${product.name} is already in your cart.`);
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setShowToast(false); 
  };
  
  return (
    <Container fluid className="padding-zero" >
      <div className="-up">
      <div className="image">
      <div className="adjust">
        <h1 className="first">MEN'S </h1>
        <h3 className="second">SHOES</h3>
        <h1 className="third">COLLECTION</h1>
        <h2 className="fourth">NEW treading shoes</h2>
        <button className="button" >SHOP COLLECTION</button>
      </div>
      </div>
    
   
      </div>

<Container className="mt-4">
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={product.picture} alt={product.name} style={{ height: '250px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(product)} className="button-add-to-card">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available!</p>
        )}
      </Row>

      <Toast style={{backgroundColor:"#212529", color:"#FFFFFF"}} show={showToast} onClose={closeToast} className="position-fixed bottom-0 end-0 m-3">
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      </Container>
    </Container>
  );
}
