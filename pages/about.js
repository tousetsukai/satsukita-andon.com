import React from 'react'
import axios from 'axios'

export default class About extends React.Component {

  static async getInitialProps() {
    const res = await axios.get('https://api.satsukita-andon.com/dev/contents/about')
    console.log(res)
    return { content: res.data.body }
  }

  render() {
    return (
      <div>
        {this.props.content}
      </div>
    )
  }
}
