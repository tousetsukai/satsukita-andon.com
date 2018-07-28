import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import Layout from "../layouts/default";
import Markdown from "../components/markdown";
import actions from "../actions";

class Article extends React.Component {
  static async getInitialProps({ query, store }) {
    await store.dispatch(actions.howto.article.fetch(query.id));
    return {};
  }

  render() {
    const { article } = this.props;
    if (typeof article === "undefined") {
      return <Layout />;
    }
    return (
      <Layout>
        <Head>
          <title>{article.title} - 行灯職人への道</title>
        </Head>
        <Markdown md={article.body} />
      </Layout>
    );
  }
}

export default connect(state => ({ article: state.howto.article }))(Article);
