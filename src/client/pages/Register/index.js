import React from 'react';
import { RedirectWithoutLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Layout from 'components/Layout';

import * as action from './action';

let Register = ({
  route: { title },
  handleSubmit,
  register: { registerSuccess },
  registerAction,
}) => {
  const onSubmit = (value) => {
    registerAction(value);
  };

  return registerSuccess ? (
    <RedirectWithoutLastLocation to='/login' />
  ) : (
    <Layout title={title} showSidebar={false} needLogin={false}>
      <h1 className='text-center'>Register</h1>

      <div className='row'>
        <div className='col col-md-6 offset-md-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <b>
                <label htmlFor='name'>Name</label>
              </b>
              <Field
                id='name'
                name='name'
                component='input'
                placeholder='Name'
                className='form-control'
              />
            </div>

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
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

Register = reduxForm({
  form: 'Register',
})(Register);

const mapStateToProps = ({ global, register }) => ({ global, register });

const mapDispatchToProps = {
  registerAction: action.registerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
