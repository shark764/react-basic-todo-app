import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Layout from './layout';
import { formSubmit } from '../../redux/actions';
import { getSelectedItemId, getSelectedItem } from '../../redux/selectors';

const mapStateToProps = state => ({
  form: `form:${getSelectedItemId(state)}`,
  key: `form:${getSelectedItemId(state)}`,
  initialValues: getSelectedItem(state),
  selectedItemId: getSelectedItemId(state),
});

const Form = reduxForm({
  onSubmit: (values, dispatch) => dispatch(formSubmit('edit', values)),
  destroyOnUnmount: true,
})(Layout);

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;
