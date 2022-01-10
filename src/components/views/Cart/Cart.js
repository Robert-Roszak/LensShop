import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, handleQuantity as handleQuantityRedux, addComment, addOrder } from '../../../redux/cartRedux';
import { fetchProducts } from '../../../redux/productRedux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';

import clsx from 'clsx';

import { IMAGES_URL } from '../../../config';

import styles from './Cart.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const [showCheckout, setCheckout] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const state = useSelector((state) => state);
  const cart = getCart(state);
  const products = useSelector((state) => state.products.data);

  let totalPrice = 0;
  let deliveryFee = 100;
  const freeDeliveryFrom = 1500;

  const handlePrice = () => {
    if (cart) {
      cart.forEach(item => totalPrice += item.price * item.quantity);
      if (totalPrice > freeDeliveryFrom) deliveryFee = 0;
      else totalPrice += deliveryFee;
    }
  };

  const handleQuantity = (quantity, item) => {
    let result = 0;
    result = item.quantity + quantity;
    const inStock = handleMaxQuantity(item);

    if (result > 0 && result <= inStock) dispatch(handleQuantityRedux(quantity, item._id));
    else if (result > inStock) alert(`Only ${inStock} products in stock`);
    else if (isNaN(quantity)) alert('Quantity must me a number');
    else alert('To remove item click trash icon');
  };

  const handleMaxQuantity = (item) => {
    let inStock = 0;
    products.some(product => product._id === item._id ? inStock = product.inStock : inStock);
    return inStock;
  };

  const validateEmail = (email) => {
    const validRegex = /\S+@\S+\.\S+/;
    if (email.match(validRegex)) return true;
    else return false;
  };

  const handleOrder = (event) => {
    event.preventDefault();
    const orderDetails = {};
    const email = document.getElementById('formEmail').value;
    const contact = document.getElementById('formContact').value;
    const address = document.getElementById('formAddress').value;
    const payment = document.getElementById('formPayment').value;
    const shipping = document.getElementById('formShipping').value;
    const message = document.getElementById('formMessage').value;

    if (contact && address && payment && shipping && validateEmail(email)) {
      orderDetails.contact = contact;
      orderDetails.address = address;
      orderDetails.payment = payment;
      orderDetails.shipping = shipping;
      orderDetails.message = message;
      orderDetails.email = email;
      orderDetails.items = cart;
      orderDetails.toPay = totalPrice;
      dispatch(addOrder(orderDetails));
    }
    else alert('Please provided all details');
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Row className={styles.emptyCart}>
          <Col xs lg="2">
            <p>Your cart is empty :(</p>
            <Button as={NavLink} href="/" className={styles.btn} variant="primary">Go shopping!</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  else {
    handlePrice();
    return (
      <Container className={clsx(className, styles.root)}>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            {
              showCheckout ?
                <h2 className={styles.center}>Checkout</h2>
                :
                <h2 className={styles.center}>Cart</h2>
            }
            {
              cart.length === 1 ?
                <p className={styles.center}>You have {cart.length} item in your cart</p>
                :
                <p className={styles.center}>You have {cart.length} items in your cart</p>
            }
          </Col>
        </Row>
        <Row>
          <Col xs lg="6">
            <p>Product</p>
          </Col>
          <Col xs lg="1">
            <p>Price</p>
          </Col>
          <Col xs lg="2">
            <p>Comments</p>
          </Col>
          <Col className={styles.alignCenter} xs lg="3">
            <p>Quantity</p>
          </Col>
        </Row>

        {
          cart.map(item => {
            return (
              <Row className={styles.cartItem} key={item._id}>
                <Col className={styles.imageWrapper} xs lg="2">
                  <img className={styles.image} src={`${IMAGES_URL}/${item.src}`} alt={item.name} />
                </Col>
                <Col xs lg="4" className={styles.itemDetails}>
                  <NavLink href={`/product/${item._id}`} >{item.name}</NavLink>
                  <p>{item.description}</p>
                </Col>
                <Col xs lg="1">
                  <p>${item.price}</p>
                </Col>
                <Col xs lg="2">
                  {
                    showCheckout ?
                      <p>{item.comment}</p>
                      :
                      <textarea id={item._id} placeholder='Additional comments' value={item.comment} onChange={event => dispatch(addComment(event.target.value, item._id))} />
                  }
                </Col>
                <Col xs lg="3" className={styles.quantity}>
                  {
                    showCheckout ?
                      <p>{item.quantity}</p>
                      :
                      <>
                        <Button className={styles.btn} onClick={() => handleQuantity(1, item)}>
                          <FontAwesomeIcon icon={faPlus}>-</FontAwesomeIcon>
                        </Button>
                        <input
                          type="text"
                          id='quantity'
                          name='quantity'
                          className={styles.quantityInput}
                          value={item.quantity}
                          min='0'
                          max={handleMaxQuantity(item)}
                          onChange={(event) => handleQuantity((event.target.value - item.quantity), item)}
                        />
                        <Button className={styles.btn} variant="secondary" onClick={() => handleQuantity(-1, item)}>
                          <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
                        </Button>
                        <Button className={styles.btn} variant="secondary" onClick={() => dispatch(removeFromCart(item))}>
                          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                        </Button>
                      </>
                  }
                </Col>
              </Row>
            );
          })
        }

        <Row className={clsx('justify-content-center', styles.checkout)}>
          <Col xs lg="5">
            {
              showCheckout ?
                <>
                  <Form onSubmit={event => handleOrder(event)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We will never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formContact">
                      <Form.Label>First and last name</Form.Label>
                      <Form.Control type="text" required placeholder="First and last name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" required placeholder="Address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPayment">
                      <Form.Label>Payment method</Form.Label>
                      <Form.Select required>
                        <option value="credit">Credit card</option>
                        <option value='cash'>Cash</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formShipping">
                      <Form.Label>Pickup method</Form.Label>
                      <Form.Select required>
                        <option value="shipping">Shipping</option>
                        <option value="inPerson">In person</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                      <Form.Label>Optional message to the seller</Form.Label>
                      <Form.Control type="text" placeholder="Optional message to the seller" />
                    </Form.Group>

                    <Button type="submit" className={styles.btn} variant="primary">Pay ${totalPrice} and order!</Button>
                  </Form>
                </>
                :
                ''
            }
            {
              showCheckout ?
                ''
                :
                <>
                  {
                    deliveryFee === 0 ?
                      <p className={styles.txtAlignEnd}>Free delivery!</p>
                      :
                      <p className={styles.txtAlignEnd}>Get items for <i>${(freeDeliveryFrom - totalPrice + deliveryFee)}</i> more to save <i>${deliveryFee}</i> delivery fee</p>
                  }
                  <p className={styles.txtAlignEnd}><strong>Total:</strong> ${totalPrice}</p>
                </>
            }

            {
              showCheckout ?
                ''
                :
                <Button className={styles.btn} variant="primary" onClick={() => setCheckout(true)} >Checkout</Button>
            }
          </Col>
        </Row>
      </Container>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Cart,
  Component as CartComponent,
};
