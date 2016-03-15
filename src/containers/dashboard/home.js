import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class Home extends Component {

  render() {
    return (
      <div>
        <p>行灯職人への道 管理画面</p>
        <p>記事一覧では、Howto に表示される記事の作成・更新・削除が行えます。</p>
        <p>資料一覧では、Howto に表示される資料のアップロード・更新・削除が行えます。</p>
        <p>クラス一覧では、各クラスの写真のアップロード・削除、講評、タグ付けなどが行えます。</p>
      </div>
    );
  }
}

export default connect()(Home);
