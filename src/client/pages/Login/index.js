import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import Layout from 'components/Layout';
import * as action from './action';

let Login = ({ handleSubmit, loginAction, error, route: { title } }) => {
  const onSubmit = async (value) => {
    loginAction(value);
  };

  if (error?.message) {
    toast.error(error?.message);
  }

  return (
    <Layout title={title} returnPath='/'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name='email' type='email' component='input' />
        <Field name='password' type='password' component='input' />

        <input type='submit' />
      </form>
    </Layout>
  );
};

Login = reduxForm({
  form: 'Login',
})(Login);

const mapStateToProps = ({ global, login }) => ({
  ...global,
  ...login,
});

const mapDispatchToProps = {
  loginAction: action.loginAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
