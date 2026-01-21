import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 20px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #f0f0f0',
});

export const logo = style({
  height: '40px',
  width: 'auto',
  objectFit: 'contain',
});
