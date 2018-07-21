import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import _ from 'lodash'

import Markdown from '../components/markdown'

export default class Index extends React.Component {

  static async getInitialProps() {
    const res = await axios.get('https://api.satsukita-andon.com/dev/contents/news')
    console.log(res)
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
    this.setState({
      backgroundImages: _.shuffle([1,2,3,4,5,6,7,8,9,10]).map(i =>
        `https://static.satsukita-andon.com/files/jumbotron/${i}.jpg`
      ).slice(0, 5),
    });
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>行灯職人への道</title>
        </Head>
        <div className="container padding-container">
          <h3>News</h3>
          <Markdown md={this.props.news.body}/>
        </div>
      </div>
    )
  }
}
