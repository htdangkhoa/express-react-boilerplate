// @flow
import React from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { type RouteType } from '../types';

const App = ({ route }: RouteType) => (
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
);

export default hot(module)(App);
