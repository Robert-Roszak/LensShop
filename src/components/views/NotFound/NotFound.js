import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>NotFound</h2>
    <img className={styles.image} src="https://images.pexels.com/photos/4271933/pexels-photo-4271933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt='error_404' />
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
