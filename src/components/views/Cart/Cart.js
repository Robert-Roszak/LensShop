import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkout } from '../../features/Checkout/Checkout';
import { CartItem } from '../../features/CartItem/CartItem';

import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';
import { fetchProducts } from '../../../redux/productRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import clsx from 'clsx';

import styles from './Cart.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const [showCheckout, setCheckout] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const state = useSelector((state) => state);
  const cart = getCart(state);

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

        <CartItem cart={cart} showCheckout={showCheckout} />

        <Row className={clsx('justify-content-center', styles.checkout)}>
          <Col xs lg="5">
            {
              showCheckout ? <Checkout cart={cart} totalPrice={totalPrice}/>
                :
                <>
                  {
                    deliveryFee === 0 ?
                      <p className={styles.txtAlignEnd}>Free delivery!</p>
                      :
                      <p className={styles.txtAlignEnd}>Get items for <i>${(freeDeliveryFrom - totalPrice + deliveryFee)}</i> more to save <i>${deliveryFee}</i> delivery fee</p>
                  }
                  <p className={styles.txtAlignEnd}><strong>Total:</strong> ${totalPrice}</p>
                  <Button className={styles.btn} variant="primary" onClick={() => setCheckout(true)} >Checkout</Button>
                </>
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
