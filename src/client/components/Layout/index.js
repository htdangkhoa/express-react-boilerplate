import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as globalAction from 'store/action';

const Child = ({ title, children, className }) => (
  <>
    <Helmet title={title} />
    <div className={`container ${className}`}>{children}</div>
  </>
);

const Layout = (props) => {
  const {
    needLogin,
    returnPath = '/',
    className,
    location: { pathname },
    global: { accessToken, refreshToken, user },
    fetchTokenAction,
    renewTokenAction,
    getMeAction,
  } = props;

  useEffect(() => {
    fetchTokenAction();

    if (refreshToken && needLogin) {
      renewTokenAction({ refreshToken });
    }

    if (!user && accessToken) {
      getMeAction();
    }
  }, []);

  if (needLogin && !accessToken) {
    return <Redirect to='/login' />;
  }

  if (pathname === '/login' && accessToken) {
    return <Redirect to={returnPath} />;
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
