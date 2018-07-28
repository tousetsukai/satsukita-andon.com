import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import Layout from "../layouts/default";
import Markdown from "../components/markdown";
import Jumbotron from "../components/jumbotron";
import actions from "../actions";

class Index extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(actions.contents.fetchNews());
    return {};
  }

  state = {
    backgroundImages: [], // jumbotron background images
    inJumbotron: true
  };

  // See:
  // - https://gist.github.com/koistya/934a4e452b61017ad611#gistcomment-2194590
  // - https://gist.github.com/koistya/934a4e452b61017ad611#gistcomment-2242409
  handleScroll = ev => {
    const inJumbotron =
      ev.target.scrollingElement.scrollTop < window.innerHeight;
    if (inJumbotron !== this.state.inJumbotron) {
      this.setState({ inJumbotron });
    }
  };

  componentDidMount() {
    if (window) {
      // only browser
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  render() {
    const images = [1, 2, 3, 4, 5].map(
      i => `https://static.satsukita-andon.com/files/jumbotron/${i}.jpg`
    );
    const interval = 8;
    return (
      <Layout>
        <Head>
          <title>行灯職人への道</title>
        </Head>
        <Jumbotron images={images} interval={interval} />
        <div>
          <h3>News</h3>
          <Markdown md={this.props.news.body} />
        </div>
      </Layout>
    );
  }
}

export default connect(state => ({ news: state.contents.news }))(Index);
