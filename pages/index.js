import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import _ from 'lodash'

import Layout from '../layouts/default'
import Markdown from '../components/markdown'
import Jumbotron from '../components/jumbotron'

export default class Index extends React.Component {

  static async getInitialProps() {
    const res = await axios.get('https://api.satsukita-andon.com/dev/contents/news')
    return { news: res.data }
  }

  state = {
    backgroundImages: [], // jumbotron background images
    inJumbotron: true
  }

  // See:
  // - https://gist.github.com/koistya/934a4e452b61017ad611#gistcomment-2194590
  // - https://gist.github.com/koistya/934a4e452b61017ad611#gistcomment-2242409
  handleScroll = (ev) => {
    const inJumbotron = ev.target.scrollingElement.scrollTop < window.innerHeight
    if (inJumbotron !== this.state.inJumbotron) {
      this.setState({ inJumbotron })
    }
  }

  componentDidMount() {
    if (window) { // only browser
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    const images = [1,2,3,4,5].map(i =>
      `https://static.satsukita-andon.com/files/jumbotron/${i}.jpg`
    )
    const interval = 8
    return (
      <Layout>
        <Head>
          <title>行灯職人への道</title>
        </Head>
        <Jumbotron images={images} interval={interval} />
        <div>
          <h3>News</h3>
          <Markdown md={this.props.news.body}/>
        </div>
      </Layout>
    )
  }
}
