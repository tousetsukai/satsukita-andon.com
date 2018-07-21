import React, { Component } from 'react'
import axios from 'axios'

class About extends Component {
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

export default About
