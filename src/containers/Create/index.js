import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import Layout from './layout';
import { formSubmit } from '../../redux/actions';

const Form = reduxForm({
  onSubmit: (values, dispatch) => dispatch(formSubmit('create', values)),
  destroyOnUnmount: true,
})(Layout);

const mapStateToProps = (state, props) => ({
  form: `form:${props.mode === 'inline' ? 'inline:' : ''}create`,
  key: 'form:create',
  initialValues: fromJS({}),
});

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;
