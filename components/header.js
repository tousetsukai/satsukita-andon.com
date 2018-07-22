import React from 'react'

import { Link } from '../routes'

export default class Header extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <header className="header">
        <nav className="header-wrapper">
          <div className="header-left">
            <ul>
              <li>
                <Link route='/'>
                  <a>
                    <img className="logo" src="/static/img/logo.png" />
                  </a>
                </Link>
              </li>
              <li>
                <Link route='/gallery'>
                  <a className="menu-link">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link route='/howto'>
                  <a className="menu-link">
                    Howto
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="header-right">
          </div>
        </nav>
        <style jsx>{`
.header {
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;                 /* react-image uses 999-1001 */
}
.header:hover {
  background-color: rgba(0, 0, 0, 0.95);
}

.header-wrapper {
  margin: auto;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
@media (max-width: 1180px) {
  .header-wrapper {
    width: 100%;
  }
}
@media (min-width: 1180px) {
  .header-wrapper {
    width: 1180px;
  }
}

nav {
  height: 100%;
}
ul {
  display: flex;
  align-items: center;
  height: 100%;
}
li {
  list-style-type: none;
}

.logo {
  height: 40px;
}
.menu-link {
  color: #eee;
  text-decoration: none;
}
.menu-link:hover {
  text-decoration: none;
  color: #f30;
}
.menu-link:focus {
  text-decoration: none;
  color: #f30;
}
        `}</style>
      </header>
    )
  }
}
