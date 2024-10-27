"use client";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import {} from "./Navbar.css";

export default function CustomNavbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = storedCart.reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );
    setCartCount(totalItems);
  }, []);

  return (
    <Navbar
      // style={{ backgroundColor: "#7777a1" }}
      variant="dark"
      expand="lg"
      className="p-3"
    >
      <Container>
        <Navbar.Brand href="/" className="homelinkpage">
          <Image
            src="/images/icons8-man-logo.svg"
            width={50}
            height={50}
            style={{
              position: "absolute",
              left: "9px",
              bottom: "20px",
              top: "0",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/createProduct" passHref legacyBehavior>
              <Nav.Link style={{ width: "200px" }}>createProduct</Nav.Link>
            </Link>
            <Link href="/cart" passHref legacyBehavior>
              <Nav.Link>
                <div className="cartadjust">
                  <Image
                    src="/images/cart-large-2-svgrepo-com.svg"
                    alt="Shopping Cart"
                    width={30}
                    height={30}
                    
                  />
                  {cartCount > 0 && (
                    <Badge bg="danger" pill className="Badge">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
