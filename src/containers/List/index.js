import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from './layout';

import { getAllItems } from '../../redux/selectors';
import { toggleAll } from '../../redux/actions';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAll: false,
    };
  }

  handleCheck = () => {
    const { checkedAll } = this.state;
    this.props.onToggleAll(!checkedAll);

    this.setState(prevState => ({
      checkedAll: !prevState.checkedAll,
    }));
  };

  render() {
    const { checkedAll } = this.state;
    const { items, ...rest } = this.props;

    return <Layout items={items} checkedAll={checkedAll} handleCheck={this.handleCheck} {...rest} />;
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

const mapStateToProps = state => ({
  items: getAllItems(state),
});

const actions = {
  onToggleAll: toggleAll,
};

export default connect(mapStateToProps, actions)(List);
