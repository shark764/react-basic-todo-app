import React, { Component } from 'react';

class ReferenceUsage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
    };

    this.lastName = '';
  }

  handleFirstNameChange = e => {
    this.setState({
      firstName: e.target.value,
    });
  };

  handleLastNameChange = e => {
    /**
     * Instead of changing the state, we just
     * change the value of class variable
     */
    this.lastName = e.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('%c Submitting both values', 'background: #116699; color: white;', this.state.firstName, this.lastName);

    this.setState({
      firstName: '',
    });
    /**
     * Example of the use of "Ref"
     * Clearing input after submit
     */
    this.lastNameInput.value = '';
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstName !== this.state.firstName) {
      console.log('%c Firstname has changed', 'background: black; color: white;');
    }
  }

  render() {
    console.log('%c A render occurred due to fields value changed', 'background: gray; color: white;');

    return (
      <div className="App-main">
        <div className="App-list">
          <h3>State vs Ref</h3>
          <form onSubmit={this.handleSubmit} className="form-inline" autoComplete="off">
            <input
              type="text"
              name="firstName"
              placeholder="firstname..."
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <input
              ref={ref => (this.lastNameInput = ref)}
              type="text"
              name="lastName"
              placeholder="lastname..."
              onChange={this.handleLastNameChange}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

ReferenceUsage.propTypes = {};

export default ReferenceUsage;
