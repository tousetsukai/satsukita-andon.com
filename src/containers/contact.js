import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';

import Markdown from '../components/markdown';
import { loading, getFixedContent } from '../actions';
import { meta } from '../util/helmet';

class Contact extends Component {

  static fetchData = ({ dispatch }) => {
    return dispatch(loading(getFixedContent('contact')));
  };

  componentWillMount = () => {
    if (_.isEmpty(this.props.contact)) {
      return Contact.fetchData({ dispatch: this.props.dispatch });
    }
  };

  render() {
    return (
      <div className="container padding-container">
        <Helmet title="Contact"
                meta={meta('Contact', 'お問い合わせ・質問')}
        />
        {this.props.contact.body && <Markdown md={this.props.contact.body}/>}
      </div>
    );
  }
}

export default connect(
  state => ({
    contact: state.contents.contact,
  })
)(Contact);
