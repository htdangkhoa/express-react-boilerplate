/* @flow */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import head from 'utils/head';

import Loading from 'components/Loading';

const App = (props) => {
  const {
    route,
    global: { isLoading },
  } = props;

  return (
    <>
      <Helmet {...head} />
      {renderRoutes(route.routes)}
      {isLoading && <Loading />}
      <ToastContainer />
    </>
  );
};

const mapStateToProps = ({ global }) => ({ global });

export default hot(module)(connect(mapStateToProps)(App));
