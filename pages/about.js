import React from 'react'
import axios from 'axios'
import Head from 'next/head'

import Markdown from '../components/markdown'
import Layout from '../layouts/default'

export default class About extends React.Component {

  static async getInitialProps() {
    const res = await axios.get('https://api.satsukita-andon.com/dev/contents/about')
    return { content: res.data.body }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>行灯職人への道 - About</title>
        </Head>
        <Markdown md={this.props.content} />
      </Layout>
    )
  }
}
