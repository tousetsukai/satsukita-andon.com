import React from 'react'

import { Link } from '../routes'
import Header from '../components/header'
import Footer from '../components/footer'

export default class Default extends React.Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
        <style global jsx>{`
          body {
            background-color: black;
          }
        `}</style>
      </div>
    )
  }
}
