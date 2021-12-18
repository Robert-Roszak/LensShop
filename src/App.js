import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Product } from './components/views/Product/Product';
import { Cart } from './components/views/Cart/Cart';
import { NotFound } from './components/views/NotFound/NotFound';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/product/:id' component={Product} />
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
