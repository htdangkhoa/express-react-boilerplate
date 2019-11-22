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
import Footer from 'components/Footer';

import styles from './styles.scss';

const App = (props) => {
  const {
    route,
    global: { isLoading, theme },
  } = props;

  return (
    <div className={`${styles.App} ${theme}`}>
      <Helmet {...head} />
      <div>
        <NavBar />
        {renderRoutes(route.routes)}
        <Footer />
        {isLoading && <Loading />}
      </div>
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
