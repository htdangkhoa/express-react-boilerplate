import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { isEmail } from 'validator';

import Layout from 'components/Layout';

import * as action from './action';

let Login = ({ handleSubmit, loginAction, route: { title } }) => {
  const onSubmit = async (value) => {
    loginAction(value);
  };

  return (
    <Layout title={title} returnPath='/' showSidebar={false}>
      <h1 className='text-center'>Login</h1>

      <div className='row'>
        <div className='col col-md-6 offset-md-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <b>
                <label htmlFor='email'>Email</label>
              </b>
              <Field
                id='email'
                name='email'
                type='email'
                component='input'
                placeholder='Email'
                className='form-control'
              />
            </div>

            <div className='form-group'>
              <b>
                <label htmlFor='password'>Password</label>
              </b>
              <Field
                id='password'
                name='password'
                type='password'
                component='input'
                placeholder='Password'
                className='form-control'
              />
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

Login = reduxForm({
  form: 'Login',
})(Login);

const mapStateToProps = ({ global, login }) => ({
  global,
  login,
});

const mapDispatchToProps = {
  loginAction: action.loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
