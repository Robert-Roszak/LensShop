import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addComment, handleQuantity as handleQuantityRedux } from '../../../redux/cartRedux';
import { fetchProducts } from '../../../redux/productRedux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import { IMAGES_URL } from '../../../config';

import styles from './CartItem.module.scss';

const Component = ({cart, showCheckout}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const products = useSelector((state) => state.products.data);

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

  return (
    <>
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
    </>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  cart: PropTypes.any,
  showCheckout: PropTypes.bool,
};

export {
  Component as CartItem,
  Component as CartItemComponent,
};
