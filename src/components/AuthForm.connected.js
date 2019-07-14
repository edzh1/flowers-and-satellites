import AuthForm from './AuthForm';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

export default withRouter(
  reduxForm({
    form: 'auth',
  })(AuthForm),
);
