import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class ClassTabs extends React.Component {

  static propTypes = {
    tab: React.PropTypes.string.isRequired,
  }

  render() {
    const { clazz } = this.props;
    const path = `/gallery/${clazz.times_ord}/${clazz.grade}-${clazz['class']}`;
    const tabName = this.props.tab;
    const tabs = [
      { tab: 'basic', label: '基本情報' },
      { tab: 'reviews', label: '講評' },
      { tab: 'resources', label: '記事・資料' },
      { tab: 'images', label: '写真' },
      { tab: 'videos', label: '動画' },
    ].map(({ tab, label }) => {
      const isActive = tabName === tab;
      return (
        <li key={tab}
            className={classnames({ 'class-tab': true, 'class-tab-active': isActive })}>
          <Link to={{ pathname: path + '/' + tab }}
                className={classnames({ 'class-text': true, 'class-text-active': isActive })}>
            {label}
          </Link>
        </li>
      );
    });
    return (
      <ul className="class-tabs">
        {tabs}
      </ul>
    );
  }
}

export default ClassTabs;
