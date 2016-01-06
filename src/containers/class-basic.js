import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';

import * as classutil from '../util/class';

class ClassBasic extends Component {

  static propTypes = {
    clazz: T.shape({
      times_ord: T.string.isRequired,
      grade: T.number.isRequired,
      ['class']: T.number.isRequired,
      title: T.string.isRequired,
      title_kana: T.string,
      description: T.string,
    }).isRequired,
  }

  render() {
    const { clazz } = this.props;
    return (
      <div>
        <dl>
          <dt>クラス</dt>
          <dd>{classutil.classNameJa(clazz)}</dd>
          <dt>よみがな</dt>
          <dd>{clazz.title_kana}</dd>
          <dt>タイトル</dt>
          <dd>{clazz.title}</dd>
          <dt>紹介文</dt>
          <dd>{clazz.description}</dd>
        </dl>
      </div>
    );
  }
}

export default connect(
  state => ({
    clazz: state.clazz.clazz,
  })
)(ClassBasic);
