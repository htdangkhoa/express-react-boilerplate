/* @flow */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import head from 'utils/head';

import Loading from 'components/Loading';
import NavBar from 'components/NavBar';

const App = (props) => {
  const {
    route,
    global: { isLoading },
  } = props;

  return (
    <div>
      <Helmet {...head} />
      <>
        <NavBar />
        <main>{renderRoutes(route.routes)}</main>
        {isLoading && <Loading />}
      </>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = ({ global }) => ({ global });

const mapDispatchToProps = {};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
