import React from 'react';
import { Form, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { auth } from '../actions/user';

const AuthForm = props => {
  const { handleSubmit, pristine, submitting, error, history } = props;
  const submit = async (values, dispatch) => {
    dispatch(auth.request({ ...values, history }));
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <div>
        <label>Authorize</label>
        <div>
          <Field name="login" component="input" type="text" placeholder="First Name" />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name="password" component="input" type="password" placeholder="Password" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <div>{error}</div>
      </div>
    </Form>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default AuthForm;
