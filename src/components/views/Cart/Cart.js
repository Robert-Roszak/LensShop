import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, handleQuantity as handleQuantityRedux } from '../../../redux/cartRedux';
import { fetchProducts } from '../../../redux/productRedux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import clsx from 'clsx';

import { IMAGES_URL } from '../../../config';

import styles from './Cart.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();

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
    else if (result > inStock) alert('No more products in stock');
    else if (isNaN(quantity)) alert('Quantity must me a number');
    else alert('To remove item click trash icon');
  };

  const handleMaxQuantity = (item) => {
    let inStock = 0;
    products.some(product => product._id === item._id ? inStock = product.inStock : inStock);
    return inStock;
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
            <h2 className={styles.center}>Cart</h2>
            {
              cart.length === 1 ?
                <p className={styles.center}>You have {cart.length} item in your cart</p>
                :
                <p className={styles.center}>You have {cart.length} items in your cart</p>
            }
          </Col>
        </Row>
        <Row>
          <Col xs lg="7">
            <p>Product</p>
          </Col>
          <Col xs lg="2">
            <p>Price</p>
          </Col>
          <Col className={styles.test} xs lg="3">
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
                <Col xs lg="5" className={styles.itemDetails}>
                  <NavLink href={`/product/${item._id}`} >{item.name}</NavLink>
                  <p>{item.description}</p>
                </Col>
                <Col xs lg="2">
                  <p>${item.price}</p>
                </Col>
                <Col xs lg="3" className={styles.quantity}>
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
                </Col>
              </Row>
            );
          })
        }

        <Row className={clsx('justify-content-md-end', styles.checkout)}>
          <textarea placeholder='Additional comments to the order'></textarea>
          {
            (deliveryFee === 0 ?
              <p className={styles.txtAlignEnd}>Free delivery!</p>
              :
              <p className={styles.txtAlignEnd}>Get items for ${(freeDeliveryFrom - totalPrice + deliveryFee)} more to save ${deliveryFee} delivery fee</p>
            )
          }
          <p className={styles.txtAlignEnd}>Total: ${totalPrice}</p>
          <Button as={NavLink} href="/checkout" className={styles.btn} variant="primary">Checkout</Button>
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
