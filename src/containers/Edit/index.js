import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Layout from './layout';
import { formSubmit, setSelectedItemId } from '../../redux/actions';
import { getSelectedItemId, getSelectedItem } from '../../redux/selectors';

const Form = reduxForm({
  onSubmit: (values, dispatch) => dispatch(formSubmit('edit', values)),
  destroyOnUnmount: true,
})(Layout);

const mapStateToProps = (state, props) => ({
  /**
   * We use "inline" text to unmount/mount form
   * when moving through menu, since we use same form
   * component inline and whole page
   */
  form: `form:${props.mode === 'inline' ? 'inline:' : ''}${getSelectedItemId(state)}`,
  key: `form:${getSelectedItemId(state)}`,
  initialValues: getSelectedItem(state),
  selectedItemId: getSelectedItemId(state),
});

const actions = {
  setSelectedItemId,
};

const ConnectedForm = connect(mapStateToProps, actions)(Form);

export default ConnectedForm;
