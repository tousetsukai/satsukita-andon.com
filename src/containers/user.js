import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loading, getUser, clearUser } from '../actions';
import Icon from '../components/icon';
import { classIdWithSlash } from '../util/class';

class User extends React.Component {
  static fetchData = ({ params, dispatch }) => {
    return dispatch(loading(getUser(params.login)));
  }
  fetchData = (props) => {
    const { dispatch, params, user } = props;
    if (_.isEmpty(user) || user.login !== params.login) {
      dispatch(clearUser);
      User.fetchData(props);
    }
  }
  componentWillMount() {
    this.fetchData(this.props);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.params.login !== this.props.params.login) {
      this.fetchData(nextProps);
    }
  }
  renderClass = (clazz) => {
    return (
      <div style={{width: '300px'}}>
        <Link to={'/gallery/' + classIdWithSlash(clazz)}>
          <img src={clazz.thumbnail_url}/>
        </Link>
      </div>
    );
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <div>
          <Icon user={user}/>
          <p>{user.name} @{user.login}</p>
        </div>
        <p>{user.biography}</p>
        <p>{user.times}期</p>
        {user.class_first && this.renderClass(user.class_first)}
        {user.class_second && this.renderClass(user.class_second)}
        {user.class_third && this.renderClass(user.class_third)}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.users.user,
  }),
)(User);
