import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as classutil from '../util/class';

class ClassBasic extends Component {

  static propTypes = {
    clazz: T.object.isRequired, // empty object or class object
  };

  render() {
    const { clazz } = this.props;
    return (
      <div>
        <dl>
          <dt>クラス</dt>
          <dd>{classutil.classNameJa(clazz)}</dd>
          <dt>よみがな</dt>
          <dd>{clazz.title_kana || '未登録'}</dd>
          <dt>タイトル</dt>
          <dd>{clazz.title}</dd>
          <dt>紹介文</dt>
          <dd>{clazz.description || '未登録'}</dd>
          <dt>タグ</dt>
          <dd>
            <ul className="tags">
              {clazz.tags.map((tag, i) => <li key={i}><Link className="tag class-tag" to={`/search?tag=${tag}`}>{tag}</Link></li>)}
            </ul>
          </dd>
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
