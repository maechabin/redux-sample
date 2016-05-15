import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Action Creators
function send(val) {
  return {
    type: 'SEND',
    value: val,
  };
}

// Reducer
const initialState = {
  value: 'aaa',
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEND':
      window.console.log(state);
      window.console.log(action);
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
        <FormInput />
        <FormDisplay data={this.props.value} />
      </div>
    );
  }
}

class FormInput extends React.Component {
  _send(e) {
    e.preventDefault();
    store.dispatch(send(this.refs.myInput.value.trim()));
    this.refs.myInput.value = '';
    return;
  }
  render() {
    return (
      <form>
        <input type="text" ref="myInput" defaultValue="" />
        <button onClick={this._send.bind(this)}>Send</button>
      </form>
    );
  }
}

class FormDisplay extends React.Component {
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
}

function mapStateToProps(state) {
  window.console.log(state);
  return {
    value: state.value,
  };
}
FormApp = connect(mapStateToProps)(FormApp);

ReactDOM.render(
  <Provider store={store}>
    <FormApp />
  </Provider>,
  document.querySelector('.content')
);
