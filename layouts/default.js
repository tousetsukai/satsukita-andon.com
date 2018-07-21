import React from 'react'

import { Link } from '../routes'
import Header from '../components/header'

export default class Default extends React.Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Link route='/about'>
          <a>このサイトについて</a>
        </Link>
      </div>
    )
  }
}
