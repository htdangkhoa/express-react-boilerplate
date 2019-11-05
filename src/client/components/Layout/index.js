import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as globalAction from 'store/action';

const Child = ({ title, children }) => (
  <>
    <Helmet title={title} />
    {children}
  </>
);

const Layout = (props) => {
  const {
    title,
    needLogin,
    returnPath = '/',
    children,
    location: { pathname },
    accessToken,
    fetchTokenAction,
  } = props;

  useEffect(() => {
    fetchTokenAction();
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
};

const mapStateToProps = ({ global }) => ({ ...global });

const mapDispatchToProps = {
  fetchTokenAction: globalAction.fetchTokenAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Layout));
