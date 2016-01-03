import React from 'react';
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
    focus: React.PropTypes.string.isRequired,
  }

  render() {
    const { sheet, focus } = this.props;
    const { classes } = sheet;
    const tabs = [
      { id: '#basic', label: '基本情報' },
      { id: '#reviews', label: '講評' },
      { id: '#resources', label: '記事・資料' },
      { id: '#images', label: '写真' },
      { id: '#videos', label: '動画' },
    ].map(({ id, label }) => {
      const isActive = focus === id;
      return (
        <li key={id}
            className={classnames({ [classes.tab]: true, [classes.activeTab]: isActive })}>
          <a href={id} className={classnames({ [classes.text]: true, [classes.activeText]: isActive })}>
            {label}
          </a>
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
