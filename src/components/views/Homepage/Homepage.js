import React from 'react';
import { useSelector } from 'react-redux';
import { Products } from '../Products/Products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({className}) => {
  const products = useSelector((state) => state.products);

  return (
    <div className={clsx(className, styles.root)}>
      <h2>Homepage</h2>
      <Container>
        <Row className="g-4">
          {
            products.data.map(product => (<Products product={product} key={product._id}/>))
          }
        </Row>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
