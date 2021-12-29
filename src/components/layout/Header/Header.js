import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchCart, getCart } from '../../../redux/cartRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket, faCamera } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

import styles from './Header.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  },[dispatch]);
  const state = useSelector((state) => state);
  const cart = getCart(state);
  let cartLenght = 0;

  if (cart != null) cartLenght = cart.length;
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className={styles.align}>
          <Col className={styles.phoneNumber}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> 2300 - 3560 - 222
            </p>
          </Col>
          <Col className={styles.logo}>
            <NavLink exact to={'/'} activeClassName='active' className={styles.link}>
              <FontAwesomeIcon className={styles.icon} icon={faCamera} />
              <p>Lens shop</p>
            </NavLink>
          </Col>
          <Col className={styles.cart}>
            <NavLink exact to={'/cart'} activeClassName='active'>
              <button className={styles.cartBox}>
                <div className={styles.cartIcon}>
                  <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
                </div>
                <div className={styles.cartCounter}>{cartLenght}</div>
              </button>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
