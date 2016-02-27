import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Markdown from '../components/markdown';
import { meta } from '../util/helmet';

class License extends Component {

  render() {
    const md = `
# 行灯職人への道のライセンス情報

本サイト内のコンテンツについてはすべての権利を主張します。

例外として、北海道札幌北高校の現役生のみ、本サイト内の写真・文章の [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/deed.ja) での利用を認めます。
（つまり、出典を明記しさえすれば本サイトのコンテンツを許可無く改変・使用（営利目的も含む）して構いません。）

# 行灯職人への道で使っている素材のライセンス

Icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
    `;
    return (
      <div className="container padding-container">
        <Helmet title="License"
                meta={meta('License', '行灯職人への道のライセンス情報')}
        />
        <Markdown md={md}/>
      </div>
    );
  }
}

export default License;
