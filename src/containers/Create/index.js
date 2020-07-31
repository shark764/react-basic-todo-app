import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import Layout from './layout';
import { formSubmit } from '../../redux/actions';

const mapStateToProps = () => ({
  form: 'form:create',
  key: 'form:create',
  initialValues: fromJS({}),
});

const Form = reduxForm({
  onSubmit: (values, dispatch) => dispatch(formSubmit('create', values)),
  destroyOnUnmount: true,
})(Layout);

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;
