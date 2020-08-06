const validate = values => ({
  name: !values.get('name') && 'Field cannot be empty.',
  type: !values.get('type') && 'Field cannot be empty.',
});

export default validate;
