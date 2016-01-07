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
    scrollPosition: T.number.isRequired,
    itemWidth: T.number.isRequired,
    onScrollChange: T.func.isRequired,
  }

  componentWillUpdate(nextProps) {
    const pos = nextProps.scrollPosition;
    if (pos !== this.props.scrollPosition) {
      const node = findDOMNode(this);
      node.scrollLeft = pos;
    }
  }

  handleScroll = (e) => {
    this.props.onScrollChange(e);
  }

  render() {
    const { items, activeId, itemWidth } = this.props;
    const components = items.map(({ link, label, id }) => {
      return (
        <li className={classnames({ 'nav-bar-item': true, 'nav-bar-item-active': activeId === id })}
            style={{minWidth: itemWidth + 'px'}}
            key={id}>
          <Link className="nav-bar-item-link" to={link}>{label}</Link>
        </li>
      );
    });
    return (
      <div className="nav-bar-shadow" onScroll={this.handleScroll}>
        <ul className="nav-bar-items">
          {components}
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
  }
  state = {
    scrollPosition: 0,
  }
  initScrollPosition = (props) => {
    const i = props.items.findIndex((item) => item.id === props.activeId);
    this.setState({ scrollPosition: i >= 0 ? i * 70 : 0 });
  }
  componentDidMount() {
    this.initScrollPosition(this.props);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activeId !== this.props.activeId) {
      this.initScrollPosition(this.props);
    }
  }
  handleArrow = (num) => () => {
    const next = this.state.scrollPosition + num;
    this.setState({ scrollPosition: next });
  }
  handleScroll = (e) => {
    console.log(e.target.scrollLeft);
    this.setState({ scrollPosition: e.target.scrollLeft });
  }
  render() {
    const { items, activeId } = this.props;
    const opts = {
      items,
      activeId,
      scrollPosition: this.state.scrollPosition,
      itemWidth: 70,
      onScrollChange: this.handleScroll,
    };
    return (
      <div className="nav-bar">
        <button className="nav-bar-arrow" onClick={this.handleArrow(-200)}>&lt;</button>
        <NavBarItems {...opts}/>
        <button className="nav-bar-arrow" onClick={this.handleArrow(200)}>&gt;</button>
      </div>
    );
  }
}
