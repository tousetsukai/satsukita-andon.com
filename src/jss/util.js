export const ghostButton = (color, hover) => ({
  color: color,
  'text-decoration': 'none',
  border: '1px solid',
  'border-color': color,
  'border-radius': 5,
  padding: '6px 12px',
  transition: '0.1s linear',
  background: 'transparent',
  '&:hover, &:focus': {
    'text-decoration': 'none',
    'border-color': hover,
    'color': hover,
  },
});
