import React, { Component } from 'react';
import ButtonComponent from './ReusableComponents/ButtonComponent';
import FieldComponent from './ReusableComponents/FieldComponent';

class StatefulComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    console.log('%c StatefulComponent is about to mount...', 'background: #f6f7f8; color: #21252b;');
  }

  componentDidMount() {
    console.log('%c StatefulComponent just mounted...', 'background: #f6f7f8; color: #21252b;');
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    console.log('%c StatefulComponent is about to receive props...', 'background: #f6f7f8; color: #21252b;', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      '%c Should StatefulComponent update its own state?...',
      'background: #ece0c8; color: #21252b;',
      nextProps,
      nextState,
    );
    /**
     * Avoid updating component if next state equals current one
     */
    if (this.state.counter === nextState.counter) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate(nextProps, nextState) {
    console.log(
      '%c StatefulComponent is about to update...',
      'background: #f6f7f8; color: #21252b;',
      nextProps,
      nextState,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    /**
     * Do not use "setState" here,
     * or you will create a loop over eternity
     */
    console.log('%c StatefulComponent just updated...', 'background: #ff3452; color: #f6f7f8;', prevProps, prevState);
  }

  componentWillUnmount() {
    console.log('%c StatefulComponent is about to unmount...', 'background: #ece0c8; color: #21252b;');
  }

  decrease = () => {
    this.setState(prevState => ({ counter: prevState.counter - 1 }));
  };

  increase = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  handleManualChange = e => {
    this.setState({
      counter: parseInt(e.target.value, 10),
    });
  };

  render() {
    return (
      <div>
        <h3>Stateful Component</h3>
        <form className="form-inline" autoComplete="off">
          <FieldComponent
            type="number"
            name="counter"
            id="counter"
            value={this.state.counter}
            onChange={this.handleManualChange}
          />
          <ButtonComponent onClick={this.decrease} label="-" />
          <ButtonComponent onClick={this.increase} label="+" />
        </form>
      </div>
    );
  }
}

export default StatefulComponent;
