import React from 'react';

export const iconId = (prize) => {
  if (prize.index >= 100) { // grand
    return 'first';
  } else if (prize.index >= 40) { // gold, silver, bronze
    return 'second';
  } else {
    return 'third';
  }
};

export const icon = (prize) => (
  <svg key={prize.code} className="prize-icon" style={{color: '#' + prize.color, fill: 'currentColor'}}>
    <use xlinkHref={'/static/img/prizes.svg#' + iconId(prize)}/>
  </svg>
);
