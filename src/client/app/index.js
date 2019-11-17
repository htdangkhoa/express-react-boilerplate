/* @flow */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { ToastContainer, toast } from 'react-toastify';
import head from 'utils/head';

import Loading from 'components/Loading';
import NavBar from 'components/NavBar';

import styles from './styles.scss';

toast.configure({ autoClose: 8000 });

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
