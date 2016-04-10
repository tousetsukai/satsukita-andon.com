import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loading, getUser, clearUser } from '../actions';
import Icon from '../components/icon';
import BreakableParagraph from '../components/breakable-paragraph';
import { classIdWithSlash, classNameJa } from '../util/class';
import * as prizeutil from '../util/prize';

class User extends React.Component {

  static fetchData = ({ params, dispatch }) => {
    return dispatch(loading(getUser(params.login)));
  };

  componentWillMount() {
    if (this.props.rendered) {
      this.props.dispatch(clearUser);
      User.fetchData(this.props);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.login !== this.props.params.login) {
      nextProps.dispatch(clearUser);
      User.fetchData(nextProps);
    }
  }

  renderClass = (clazz, chief) => {
    return (
      <div className="user-profile-class">
        <Link to={'/gallery/' + classIdWithSlash(clazz)}>
          <img className="class-image" src={clazz.thumbnail_url}/>
          <div className="class-info">
            <p className="class-id">{classNameJa(clazz)}</p>
            <p className="class-title">{clazz.title}</p>
            <p className="class-prizes">
              {clazz.prizes.map(prize => (
                 <span key={prize.code} style={{color: '#' + prize.color}}>
                   {prizeutil.icon(prize)}
                   {prize.label}
                 </span>
               ))}
            </p>
            {chief && <p className="class-chief">○ 責任者</p>}
          </div>
        </Link>
      </div>
    );
  };
  render() {
    const { user } = this.props;
    return (
      <div className="container padding-container user-profile">
        <div className="user-profile-header">
          <Icon user={user}/>
          <p className="user-profile-name">
            {user.name}
          </p>
          <p className="user-profile-sub">
            <span className="user-profile-times">{user.times}期</span>
            {user.admin && <span className="user-profile-admin"> 管理人</span>}
          </p>
        </div>
        <BreakableParagraph className="user-profile-biography" text={user.biography}/>
        <h2>- 制作 -</h2>
        <div className="user-profile-classes">
          {user.class_first && this.renderClass(user.class_first, user.chief_first)}
          {user.class_second && this.renderClass(user.class_second, user.chief_second)}
          {user.class_third && this.renderClass(user.class_third, user.chief_third)}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.users.user,
    rendered: state.app.rendered,
  }),
)(User);
