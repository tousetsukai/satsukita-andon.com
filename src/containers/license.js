import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { meta } from '../util/helmet';

class License extends Component {

  render() {
    return (
      <div className="container padding-container">
        <Helmet title="License"
                meta={meta('License', '行灯職人への道のライセンス情報')}
        />
        <section>
          <h1>
            行灯職人への道のライセンス情報
          </h1>
          <p>
            本サイト内のコンテンツについてはすべての権利を主張します。
            例外として、北海道札幌北高校の現役生のみ、本サイト内の写真・文章の <a href="http://creativecommons.org/licenses/by/4.0/deed.ja">CC BY 4.0</a> での利用を認めます。
            つまり、出典を明記しさえすれば本サイトのコンテンツを許可無く改変・使用（営利目的も含む）して構いません。
          </p>
          <h1>
            行灯職人への道で使っている素材のライセンス
          </h1>
          <p>
            Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>
          </p>
        </section>
      </div>
    );
  }
}

export default License;
