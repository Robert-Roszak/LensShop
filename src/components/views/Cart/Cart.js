import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Cart.module.scss';

const Component = ({className, children}) => (
  <Container className={clsx(className, styles.root)}>
    <Row className="justify-content-md-center">
      <Col xs lg="2">
        <h2 className={styles.center}>Cart</h2>
        <p className={styles.center}>3 items in your cart</p>
      </Col>
    </Row>
    <Row>
      <Col xs lg="6">
        <p>Product</p>
      </Col>
      <Col xs lg="2">
        <p>Price</p>
      </Col>
      <Col xs lg="4">
        <p>Quantity</p>
      </Col>
    </Row>
    <hr/>
    <Row>
      <Col xs lg="2">
        <p>img here</p>
      </Col>
      <Col xs lg="4">
        <p>Product name</p>
        <p>Product details</p>
      </Col>
      <Col xs lg="2">
        <p>$40</p>
      </Col>
      <Col xs lg="4" className={styles.quantity}>
        <Button className={styles.btn}>
          <FontAwesomeIcon icon={faPlus}>-</FontAwesomeIcon>
        </Button>
        <input type="text" id='quantity' name='quantity' className={styles.quantityInput} value="1" />
        <Button className={styles.btn} variant="secondary">
          <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
        </Button>
        <Button className={styles.btn} variant="secondary">
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </Button>
      </Col>
      <hr />
    </Row>
    <Row className="justify-content-md-end">
      <p className={styles.txtAlignEnd}>Delivery: $15</p>
      <p className={styles.txtAlignEnd}>Subtotal: $55</p>
    </Row>

  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Cart,
  // Container as Cart,
  Component as CartComponent,
};
