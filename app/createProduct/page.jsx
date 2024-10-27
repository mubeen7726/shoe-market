"use client";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../store/productSlice';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import "../globals.css";


export default function Create() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [idError, setIdError] = useState('');

  useEffect(() => {
    const existingProduct = products.find(product => product.id === id);
    if (existingProduct) {
      setIdError('Product ID already exists');
    } else {
      setIdError('');
    }
  }, [id, products]);

  const handleImageUpload = async () => {
    if (!picture) {
      toast.error("Please select an image!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "xrniykno");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ddqyzav4p/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading the image", error);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idError) return;

    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return;

    dispatch(addProduct({ id, name, picture: uploadedImageUrl, price }));
    toast.success(`Product "${name}" added to cart!`);
    setName('');
    setId('');
    setPicture(null);
    setPrice('');
  };

  return (
    <Container className="py-4"  >
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Add New Product</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductId">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                isInvalid={!!idError}
                required
              />
              {idError && <Form.Control.Feedback type="invalid">{idError}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductImage">
              <Form.Label>Upload Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Button style={{backgroundColor:"blue"}}
              variant="success"
              type="submit"
              className="w-100"
              disabled={uploading || !!idError}
            >
              {uploading ? <Spinner animation="border" size="sm" /> : "Add Product"}
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Container>
  );
}
