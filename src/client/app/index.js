/* @flow */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ToastContainer, toast } from 'react-toastify';
import head from 'utils/head';
import styles from './styles.scss';
import * as globalAction from 'store/action';
import Loading from 'components/Loading';

toast.configure({ autoClose: 8000 });

const App = ({
  route,
  accessToken,
  loading,
  fetchTokenAction,
  updateTokenAction,
}) => {
  useEffect(() => {
    fetchTokenAction();
  }, []);

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
        {accessToken && (
          <div>
            <button
              className='btn btn-danger'
              onClick={() => {
                updateTokenAction();
              }}>
              Logout
            </button>
          </div>
        )}
        {loading && <Loading />}
        {renderRoutes(route.routes)}
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = ({ global }) => ({ ...global });

const mapDispatchToProps = {
  fetchTokenAction: globalAction.fetchTokenAction,
  updateTokenAction: globalAction.updateTokenAction,
};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
