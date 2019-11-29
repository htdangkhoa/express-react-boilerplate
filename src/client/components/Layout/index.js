import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import {
  useLastLocation,
  RedirectWithoutLastLocation,
} from 'react-router-last-location';
import PropTypes from 'prop-types';
import * as globalAction from 'store/action';
import './styles.scss';

const Child = ({ title, children, showSidebar = true }) => (
  <>
    <Helmet title={title} />
    <div className='container'>
      <div className='row'>
        {showSidebar && (
          <div className='col-3 sidebar d-none d-md-block'>
            <Link to='/' className='sidebar__title'>
              <h1>KBlog</h1>
            </Link>
            <p>
              Chia sẻ những kinh nghiệm, kiến thức, các case study giúp mọi
              người có thể tạo ra những service chuyên nghiệp hơn
            </p>

            <ul className='nav flex-column'>
              <li className='nav-item'>
                <NavLink
                  className='nav-link sidebar__item'
                  to='/'
                  isActive={(_, { pathname }) => {
                    return pathname.match(/^\/$/) || pathname.match(/^\/p\//);
                  }}>
                  Posts
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link sidebar__item' to='/introduce'>
                  Introduce
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link sidebar__item' to='/contact'>
                  Contact
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link sidebar__item' to='/friends'>
                  Friends
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <div className={`${showSidebar ? 'col-md-9 col-12' : 'col-12'}`}>
          <div>{children}</div>
        </div>
      </div>
    </div>
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
  showSidebar: PropTypes.bool,
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
