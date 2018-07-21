import React from 'react'

import { Link } from '../routes'

export default class Default extends React.Component {

  render() {
    return (
      <div>
        <Link route='/'>
          <a>ロゴ</a>
        </Link>
        {this.props.children}
        <Link route='/about'>
          <a>このサイトについて</a>
        </Link>
      </div>
    )
  }
}
