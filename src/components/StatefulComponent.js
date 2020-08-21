import React, { Component } from 'react';

class StatefulComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  componentWillMount() {
    console.log('%c StatefulComponent is about to mount...', 'background: #f6f7f8; color: #21252b;');
  }

  componentDidMount() {
    console.log('%c StatefulComponent just mounted...', 'background: #f6f7f8; color: #21252b;');
  }

  componentWillReceiveProps(nextProps) {
    console.log('%c StatefulComponent is about to receive props...', 'background: #f6f7f8; color: #21252b;', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      '%c Should StatefulComponent update its own state?...',
      'background: #ece0c8; color: #21252b;',
      nextProps,
      nextState
    );
    /**
     * Avoid updating component if next state equals current one
     */
    if (this.state.counter === nextState.counter) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      '%c StatefulComponent is about to update...',
      'background: #f6f7f8; color: #21252b;',
      nextProps,
      nextState
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
    this.setState(prevState => {
      return { counter: prevState.counter - 1 };
    });
  };

  increase = () => {
    this.setState(prevState => {
      return { counter: prevState.counter + 1 };
    });
  };

  handleManualChange = e => {
    this.setState({
      counter: parseInt(e.target.value),
    });
  };

  render() {
    return (
      <div>
        <h3>Stateful Component</h3>
        <form className="form-inline" autoComplete="off">
          <input
            type="number"
            name="counter"
            id="counter"
            value={this.state.counter}
            onChange={this.handleManualChange}
          />
          <button type="button" onClick={this.decrease}>
            -
          </button>
          <button type="button" onClick={this.increase}>
            +
          </button>
        </form>
      </div>
    );
  }
}

export default StatefulComponent;
