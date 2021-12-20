import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { IMAGES_URL } from '../../../config';

import styles from './Products.module.scss';

const Component = ({product}) => (
  <Col xs={12} sm={6} md={4} className={styles.root}>
    <Card>
      <div className={styles.imageWrapper}>
        <Card.Img variant="top" src={`${IMAGES_URL}/${product.src}`} />
        {
          product.sale ?
            <div className={styles.saleText}>SALE!</div>
            :
            ''
        }
      </div>
      <Card.Body className={styles.body}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {
            product.sale ?
              <p className={styles.salePrice}>
                <span className={styles.oldPrice}>${product.oldPrice}</span>
                <span className={styles.newPrice}> ${product.price}</span>
              </p>
              :
              <p>${product.price}</p>
          }
        </Card.Subtitle>
        <div>
          <Button variant="primary">
            <Card.Link href={`product/${product._id}`} className={styles.white}>View product</Card.Link>
          </Button>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

Component.propTypes = {
  product: PropTypes.object,
};

export {
  Component as Products,
  Component as ProductsComponent,
};
