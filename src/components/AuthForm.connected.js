import AuthForm from './AuthForm';
import { reduxForm } from 'redux-form';

export default reduxForm({
  form: 'auth',
})(AuthForm);
