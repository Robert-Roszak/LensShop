import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addOrder } from '../../../redux/cartRedux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './Checkout.module.scss';

const Component = ({className, cart, totalPrice}) => {
  const dispatch = useDispatch();

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

  return (
    <Form className={styles.form} onSubmit={event => handleOrder(event)}>
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

      <Button type="submit" className={styles.submit} variant="primary">Pay ${totalPrice} and order!</Button>
    </Form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  cart: PropTypes.any,
  totalPrice: PropTypes.number,
};

export {
  Component as Checkout,
  Component as CheckoutComponent,
};
