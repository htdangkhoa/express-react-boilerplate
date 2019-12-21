/* @flow */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import head from 'utils/head';

import Loading from 'components/Loading';

import * as globalAction from 'store/action';

const App = ({ route, global: { isLoading }, updateThemeAction }) => {
  useEffect(() => {
    updateThemeAction(localStorage.getItem('theme') || 'light');
  }, []);

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

const mapDispatchToProps = {
  updateThemeAction: globalAction.updateThemeAction,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
