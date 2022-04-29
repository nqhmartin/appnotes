import React, { Component } from "react";
import Index from "./src/navigator/Index";
import store from "./src/redux/store";
import { Provider } from "react-redux";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
