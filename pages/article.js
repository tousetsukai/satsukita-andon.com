import React from 'react'
import axios from 'axios'
import Head from 'next/head'

import Layout from '../layouts/default'
import Markdown from '../components/markdown'

export default class Article extends React.Component {

  static async getInitialProps({ query }) {
    const res = await axios.get(`https://api.satsukita-andon.com/dev/articles/${query.id}`)
    return { article: res.data }
  }

  render() {
    const { article } = this.props
    return (
      <Layout>
        <Head>
          <title>{article.title} - 行灯職人への道</title>
        </Head>
        <Markdown md={article.body} />
      </Layout>
    )
  }
}
