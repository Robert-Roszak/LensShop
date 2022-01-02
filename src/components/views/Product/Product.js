import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGES_URL } from '../../../config';

import { fetchOneProductFromAPI } from '../../../redux/productRedux';
import { addToCart as addToCartRedux } from '../../../redux/cartRedux';

import clsx from 'clsx';

import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './Product.module.scss';


const Component = ({className}) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchOneProductFromAPI(id));
  },[dispatch, id]);

  const product = useSelector((state) => state.products.oneProduct);
  const cart = useSelector((state) => state.cart.products);

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    let canItBeAdded = false;

    if (cart) {
      cart.filter(cartItem => {
        if (cartItem._id === product._id) {
          if (cartItem.quantity < product.inStock) return canItBeAdded = true;
          else return alert('No more products in stock');
        }
        else return canItBeAdded = true;
      });
    }
    else canItBeAdded = true;

    if (quantity === null || quantity === 0) {
      alert('Please provide quantity');
    }
    else if (canItBeAdded) {
      const toCart = {
        description: product.description,
        name: product.name,
        price: product.price,
        sale: product.sale,
        src: product.src,
        _id: product._id,
        quantity: parseInt(quantity),
      };
      dispatch(addToCartRedux(toCart));
    }
  };

  const handleQuantity = (value, inStock) => {
    const parsedValue = parseInt(value);
    if (parsedValue <= inStock && value >= 0) setQuantity(value);
    else if (parsedValue > inStock) alert('No more products in stock');
    else if (parsedValue < 0) alert('Value cannot be lower than 0');
  };

  if (product) {
    return (
      <Container className={clsx(className, styles.root)} fluid={'md'}>
        <h2>Product</h2>
        <Row className={styles.allBorders}>
          <Col>
            <Carousel fade>
              <Carousel.Item interval={1000}>
                <Image src={`${IMAGES_URL}/${product.src}`} className={clsx('d-block', 'w-100', styles.image)} alt={product.src}/>
              </Carousel.Item>
              {
                product.additionalPhotos ?
                  product.additionalPhotos.map((photo, index) => (
                    <Carousel.Item key={index} interval={1000}>
                      <Image src={`${IMAGES_URL}/${photo}`} className={clsx('d-block', 'w-100', styles.image)} alt={photo} />
                    </Carousel.Item>
                  ))
                  : ''
              }
            </Carousel>
          </Col>
          <Col>
            <Row className={styles.borderBottom}>
              <h2>{product.name}</h2>
            </Row>
            <Row className={styles.borderBottom}>
              <h6>{product.description}</h6>
            </Row>
            <Row className={styles.borderBottom}>
              {
                product.sale ?
                  <p className={styles.salePrice}>
                  Sale from <span className={styles.oldPrice}>${product.oldPrice} </span>
                  to <span className={styles.newPrice}> ${product.price}</span>
                  </p>
                  :
                  <p>${product.price}</p>
              }
            </Row>
            <Row>
              <p>Availability: {
                (product.inStock === null || parseInt(product.inStock) === 0) ?
                  <strong>out of stock!</strong>
                  :
                  `${product.inStock} products in stock`
              }
              </p>
            </Row>
            <Row className={styles.buy} as={Form}>
              <Form.Control
                type="number"
                id='quantity'
                name='quantity'
                className={styles.quantityInput}
                value={quantity}
                min="0"
                max={product.inStock}
                onChange={e => handleQuantity(e.target.value, product.inStock)}
              />
              <Button variant="primary" type="submit" className={styles.btn} onClick={((event) => handleAddToCart(event, product))}>Add to cart</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.any,
  props: PropTypes.any,
};

export {
  Component as Product,
  Component as ProductComponent,
};
