import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import actions from "../actions";
import { makeStore } from "../store";

class MyApp extends App {
  static async getInitialProps(context) {
    await context.ctx.store
      .dispatch(actions.app.user.fetch(""))
      .catch(_ => console.log("invalid token"));
    const props = await super.getInitialProps(context);
    return props;
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
