import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import useSheet from '../jss';
import color from '../jss/color';

const sheet = {
  tabs: {
    display: 'flex',
    'justify-content': 'space-around',
    width: '100%',
    margin: '30px 0 30px',
  },
  tab: {
    'list-style-type': 'none',
    display: 'block',
    width: 120,
  },
  text: {
    display: 'inline-block',
    color: color.text,
    width: '100%',
    'text-align': 'center',
    'font-size': 16,
    '&:hover, &:focus': {
      color: color.theme,
      'text-decoration': 'none',
    },
  },
  activeTab: {
    'border-bottom': '3px solid',
    'border-color': color.theme,
    'padding-bottom': 3,
  },
  activeText: {
    color: color.theme,
  },
};

class ClassTabs extends React.Component {

  static propTypes = {
    tab: React.PropTypes.string.isRequired,
  }

  render() {
    const { sheet, clazz } = this.props;
    const path = `/gallery/${clazz.times_ord}/${clazz.grade}-${clazz['class']}`;
    const tabName = this.props.tab;
    const { classes } = sheet;
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
            className={classnames({ [classes.tab]: true, [classes.activeTab]: isActive })}>
          <Link to={{ pathname: path + '/' + tab }}
                className={classnames({ [classes.text]: true, [classes.activeText]: isActive })}>
            {label}
          </Link>
        </li>
      );
    });
    return (
      <ul className={classes.tabs}>
        {tabs}
      </ul>
    );
  }
}

export default useSheet(ClassTabs, sheet);
