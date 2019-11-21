import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router';
import {
  useLastLocation,
  RedirectWithoutLastLocation,
} from 'react-router-last-location';
import PropTypes from 'prop-types';
import * as globalAction from 'store/action';

const Child = ({ title, children, className }) => (
  <>
    <Helmet title={title} />
    <div className={`container ${className || ''}`.trim()}>{children}</div>
  </>
);

const Layout = (props) => {
  const {
    needLogin,
    returnPath = '/',
    location: { pathname },
    global: { accessToken, refreshToken, user },
    fetchTokenAction,
    renewTokenAction,
    getMeAction,
  } = props;

  const lastLocation = useLastLocation();

  useEffect(() => {
    fetchTokenAction();

    if (refreshToken) {
      renewTokenAction({ refreshToken });
    }

    if (!user) {
      getMeAction();
    }
  }, []);

  if (needLogin && !accessToken) {
    return <Redirect to='/login' />;
  }

  if (pathname === '/login' && accessToken) {
    return (
      <RedirectWithoutLastLocation to={lastLocation.pathname || returnPath} />
    );
  }

  return <Child {...props} />;
};

Layout.propTypes = {
  title: PropTypes.string,
  needLogin: PropTypes.bool,
  returnPath: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = ({ global }) => ({ global });

const mapDispatchToProps = {
  fetchTokenAction: globalAction.fetchTokenAction,
  renewTokenAction: globalAction.renewTokenAction,
  getMeAction: globalAction.getMeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Layout));
