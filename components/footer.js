import React from 'react'

import { Link } from '../routes'

export default class Footer extends React.Component {

  render() {
    return (
      <div>
        <Link route='/about'>
          <a>このサイトについて</a>
        </Link>
      </div>
    )
  }
}
