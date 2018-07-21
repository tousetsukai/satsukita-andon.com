import React from 'react'

import { Link } from '../routes'

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <Link route='/'>
          <a>
            <img src="/static/img/logo.png" />
          </a>
        </Link>
      </div>
    )
  }
}
