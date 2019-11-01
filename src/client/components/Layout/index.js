import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Layout = ({ title, needLogin, children }) => {
  return (
    <>
      <Helmet title={title} />
      {children}
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  needLogin: PropTypes.bool,
  children: PropTypes.node,
};

export default Layout;
