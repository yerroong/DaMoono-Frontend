import { style } from '@vanilla-extract/css';

export const pageContainer = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  backgroundColor: '#F9F9F9', // 배경색 예시
  minHeight: '100vh',
});

export const characterSection = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const contentSection = style({
  width: '100%',
});

export const cardDummy = style({
  width: '100%',
  height: '100px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
  border: '1px solid #EEE',
});
