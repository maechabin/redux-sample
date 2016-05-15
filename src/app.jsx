import React, {} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Action Creators
function send(value) {
  return {
    type: 'SEND',
    value,
  };
}

// Reducer
const initialState = {
  value: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SEND':
      return Object.assign({}, state, {
        value: action.value,
      });
    default:
      return state;
  }
}

// store
const store = createStore(formReducer, initialState);

// Veiw
class FormApp extends React.Component {
  render() {
    return (
      <div>
        <FormInput handleSendVal={this.props.onClick} />
        <FormDisplay data={this.props.value} />
      </div>
    );
  }
}
FormApp.propTypes = {
  onClick: React.PropTypes.func,
  value: React.PropTypes.string,
};

class FormInput extends React.Component {
  _send(e) {
    e.preventDefault();
    this.props.handleSendVal(this.refs.myInput.value.trim());
    this.refs.myInput.value = '';
    return;
  }
  render() {
    window.console.log(this.props);
    return (
      <form>
        <input type="text" ref="myInput" defaultValue="" />
        <button onClick={this._send.bind(this)}>Send</button>
      </form>
    );
  }
}
FormInput.propTypes = {
  handleSendVal: React.PropTypes.func,
};

class FormDisplay extends React.Component {
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
}
FormDisplay.propTypes = {
  data: React.PropTypes.string,
};

function mapStateToProps(state) {
  window.console.log(state);
  return {
    value: state.value,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onClick(value) {
      dispatch(send(value));
    },
  };
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormApp);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('.content')
);
