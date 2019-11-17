import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Switch from 'react-switch';
import * as action from 'store/action';

import styles from './styles.scss';

const NavBar = ({
  global: { theme, accessToken, user },
  updateTokenAction,
  updateThemeAction,
}) => {
  const [t, i18n] = useTranslation();

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    updateThemeAction(localStorage.getItem('theme') || 'light');
  }, []);

  const onChangeTheme = (checked) => {
    updateThemeAction(checked ? 'dark' : 'light');
  };

  const onChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
  };

  return (
    <Navbar
      color='faded'
      light={theme === 'light'}
      dark={theme === 'dark'}
      expand='lg'>
      <div className='container'>
        <NavbarBrand tag={RRNavLink} to='/'>
          <h1 className='m-0'>
            <span className='sr-only'>Express React Boilerplate</span>
          </h1>
          ERB
        </NavbarBrand>

        <NavbarToggler className='mr-2' onClick={toggleNavbar} />

        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className='w-100 mr-auto'>
            <NavItem>
              <NavLink tag={RRNavLink} to='#'>
                Posts
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={RRNavLink} to='#'>
                Questions
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className='text-capitalize'>
                {t('language')}
              </DropdownToggle>
              <DropdownMenu className={styles.dropDownMenuI18n}>
                <DropdownItem
                  onClick={async () => {
                    await onChangeLanguage('en');
                  }}>
                  {t('lang_en')}
                </DropdownItem>
                <DropdownItem
                  onClick={async () => {
                    await onChangeLanguage('vi');
                  }}>
                  {t('lang_vi')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            <NavItem
              className={`${styles.navSwitch} ${accessToken &&
                'mb-2 mb-lg-0'} mx-lg-2`}>
              <Switch
                checked={theme === 'dark'}
                onChange={onChangeTheme}
                checkedIcon={
                  <div className={styles.switchIcon}>
                    <i className='fas fa-sun fa-sm'></i>
                  </div>
                }
                uncheckedIcon={
                  <div className={styles.switchIcon}>
                    <i className='fas fa-moon fa-sm fa-flip-horizontal'></i>
                  </div>
                }
              />
            </NavItem>

            <form className='form-inline my-2 my-lg-0'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
              />
            </form>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className='text-capitalize'>
                {user?.name || 'Account'}
              </DropdownToggle>
              <DropdownMenu right className={styles.dropDownMenuI18n}>
                {!accessToken && (
                  <>
                    <DropdownItem tag={RRNavLink} to='/login'>
                      Login
                    </DropdownItem>
                    <DropdownItem tag={RRNavLink} to='/register'>
                      Register
                    </DropdownItem>
                  </>
                )}

                {accessToken && (
                  <>
                    <DropdownItem
                      className='text-right'
                      onClick={() => updateTokenAction()}>
                      Logout
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

const mapStateToProps = ({ global }) => ({ global });

const mapDispatchToProps = {
  updateTokenAction: action.updateTokenAction,
  updateThemeAction: action.updateThemeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
