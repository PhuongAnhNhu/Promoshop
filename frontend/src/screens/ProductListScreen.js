import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            history.push('/login');
        }
    }, [userInfo, history, successDelete]);

    const deleteHandler = id => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id));
        }
    };
    const createProductHandler = () => {
        console.log('create product');
    };
    return (
        <div>
            <Row className="align-item-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col>
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fa fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductListScreen;