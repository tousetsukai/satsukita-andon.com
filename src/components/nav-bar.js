import React, { PropTypes as T } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import classnames from 'classnames';

class NavBarItems extends React.Component {
  static propTypes = {
    items: T.arrayOf(T.shape({
      link: T.string.isRequired,
      label: T.string.isRequired,
      id: T.string.isRequired,
    })).isRequired,
    activeId: T.string.isRequired,
    defaultScrollPosition: T.number.isRequired,
    scrollMillis: T.number.isRequired,
  };

  // do not use componentWillMount because server does not have DOM
  componentDidMount() {
    const node = findDOMNode(this);
    node.scrollLeft = this.props.defaultScrollPosition;
  }

  scrollTo(pos) {
    const node = findDOMNode(this);
    node.scrollLeft = pos;
  }

  scrollPlus(num) {
    const node = findDOMNode(this);
    const ini = node.scrollLeft;
    let count = 0;
    const id = setInterval(() => {
      node.scrollLeft = ini + num * Math.sin(Math.PI / 2 * count);
      count += 0.1;
      if (count > 1) {
        clearInterval(id);
      }
    }, 30);
  }

  render() {
    const { items, activeId } = this.props;
    return (
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
    );
  }
}

export default class NavBar extends React.Component {
  static propTypes = {
    items: T.arrayOf(T.shape({
      link: T.string.isRequired,
      label: T.string.isRequired,
      id: T.string.isRequired,
    })).isRequired,
    activeId: T.string.isRequired,
  };
  state = {
    scrollPosition: 0,
  };
  activePosition = (props) => {
    const i = props.items.findIndex((item) => item.id === props.activeId);
    return i >= 0 ? i * 70 : 0;
  };
  componentWillMount() {
    const pos = this.activePosition(this.props);
    this.setState({ scrollPosition: pos });
  }
  componentWillUpdate(nextProps) {
    if (nextProps.activeId !== this.props.activeId) {
      const pos = this.activePosition(nextProps);
      this.refs.navBarItems.scrollTo(pos);
    }
  }
  handleArrow = (num) => () => {
    this.refs.navBarItems.scrollPlus(num);
  };
  render() {
    const { items, activeId } = this.props;
    const opts = {
      items,
      activeId,
      defaultScrollPosition: this.state.scrollPosition,
      scrollMillis: 500,
      ref: 'navBarItems',
    };
    return (
      <div className="nav-bar">
        <div className="nav-bar-arrow" onClick={this.handleArrow(-160)}>
          <i className="fa fa-caret-left fa-2x"/>
        </div>
        <NavBarItems {...opts}/>
        <div className="nav-bar-arrow" onClick={this.handleArrow(160)}>
          <i className="fa fa-caret-right fa-2x"/>
        </div>
      </div>
    );
  }
}
