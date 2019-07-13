import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { authorize } from '../actions/auth';

const AuthForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;
  const submit = handleSubmit(authorize);

  return (
    <form onSubmit={submit}>
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
    </form>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default AuthForm;
