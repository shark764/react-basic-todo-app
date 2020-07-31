import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from './layout';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleAll: false,
    };
  }

  handleCheck = () => {
    const { toggleAll } = this.state;
    this.props.onToggleAll(!toggleAll);

    this.setState(prevState => ({
      toggleAll: !prevState.toggleAll,
    }));
  };

  render() {
    const { toggleAll } = this.state;
    const { items, ...rest } = this.props;

    return <Layout items={items} toggleAll={toggleAll} handleCheck={this.handleCheck} {...rest} />;
  }
}

List.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  onToggleAll: PropTypes.func,
};

export default List;
