import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { PRODUCT_CREATE_RESET } from '../constants/userConstants';
import { listProductDetails } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    // const productUpdate = useSelector(state => state.productUpdate);
    // const {
    //     loading: loadingUpdate,
    //     error: errorUpdate,
    //     success: successUpdate,
    // } = productUpdate;

    // const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        // if (successUpdate) {
        //     dispatch({ type: PRODUCT_CREATE_RESET });
        //     history.push('/admin/userlist');
        // } else {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
        // }
    }, [productId, product]);

    const submitHandler = e => {
        e.preventDefault();
        // dispatch(
        //     updateProduct({
        //         _id: productId,
        //         name,
        //         email,
        //         isAdmin,
        //     })
        // );
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {/* {loadingUpdate && <Loader></Loader>}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )} */}

                {loading && <Loader></Loader> ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image Url"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Brand"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Count in Stock">
                            <Form.Label>Count in Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Count in Stock"
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
