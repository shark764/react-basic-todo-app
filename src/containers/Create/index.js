import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import Layout from './layout';
import { formSubmit } from '../../redux/actions';

const mapStateToProps = () => ({
  key: 'form:create',
  initialValues: fromJS({}),
});

const Form = reduxForm({
  form: 'form:create',
  onSubmit: (values, dispatch) => dispatch(formSubmit('create', values)),
  destroyOnUnmount: true,
})(Layout);

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;
