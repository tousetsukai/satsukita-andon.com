import React, { Component } from 'react';
import { Link } from 'react-router';

import DateString from './date-string';
import Icon from './icon';

// used in howto and class-resources
export default class ResourceListColumn extends Component {

  static defaultProps = {
    icon: '',
  };

  render() {
    const { icon, items, url, tags, createdBy, updatedBy } = this.props;
    return (
      <ul className="resource-list">
        {items.map((item) =>
          <li key={item.id}>
            <Link className="title" to={url(item)}>
              <i className={`fa ${icon}`}/> {item.title}
            </Link>
            <ul className="tags">
              {tags(item).map((t, i) => <li key={i}><Link to={`/howto/tags/${t}`} className="tag resource-tag">{t}</Link></li>)}
            </ul>
            <div className="editors">
              <div className="editor-box">
                <Link to={`/users/${createdBy(item).login}`}>
                  <Icon user={createdBy(item)}/>
                </Link> が <DateString className="date" date={item.created_at}/> に作成
              </div>
              {item.updated_at !== item.created_at &&
               <div className="editor-box">
                 <Link to={`/users/${updatedBy(item).login}`}>
                   <Icon user={updatedBy(item)}/>
                 </Link> が <DateString className="date" date={item.updated_at}/> に更新
               </div>}
            </div>
          </li>)
        }
      </ul>
    );
  }
}
