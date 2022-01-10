import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../Products/Products';
import { fetchProducts } from '../../../redux/productRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const products = useSelector((state) => state.products);

  if (products) {
    return (
      <div className={clsx(className, styles.root)}>
        <Container>
          <Row className="g-4">
            <h2>Our products</h2>
            {
              products.data.map(product => (<Products product={product} key={product._id}/>))
            }
          </Row>
        </Container>
      </div>
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
  className: PropTypes.string,
};

export {
  Component as Homepage,
  Component as HomepageComponent,
};
