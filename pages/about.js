import React from "react";
import { connect } from "react-redux";
import Head from "next/head";

import Markdown from "../components/markdown";
import Layout from "../layouts/default";
import actions from "../actions";

class About extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(actions.contents.fetchAbout());
    return {};
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>About - 行灯職人への道</title>
        </Head>
        <Markdown md={this.props.about.body} />
      </Layout>
    );
  }
}

export default connect(state => ({ about: state.contents.about }))(About);
