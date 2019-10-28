// @flow
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { type RouteType } from 'types';
import head from 'utils/head';
import styles from './styles.scss';

const App = ({ route }: RouteType) => {
  return (
    <div className={styles.App}>
      <Helmet {...head} />
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/test'>Test</Link>
          </li>
        </ul>
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};

export default hot(module)(App);
