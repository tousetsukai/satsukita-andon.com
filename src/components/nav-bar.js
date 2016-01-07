import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class NavBar extends React.Component {
  static propTypes = {
    items: T.arrayOf(T.shape({
      link: T.string.isRequired,
      label: T.string.isRequired,
      id: T.string.isRequired,
    })).isRequired,
  }

  render() {
    const { items, activeId } = this.props;
    return (
      <div className="nav-bar">
        <div className="nav-bar-shadow">
          <ul className="nav-bar-items">
            {items.map(({ link, label, id }) => (
              <li className={classnames({ 'nav-bar-item': true, 'nav-bar-item-active': activeId === id })}
                  key={id}>
                <Link className="nav-bar-item-link" to={link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
