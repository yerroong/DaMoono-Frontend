import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '20px',
  paddingTop: '80px', // 헤더 높이(약 61px) + 여유 공간
  paddingBottom: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  position: 'relative',
});

export const gradientBg = style({
  position: 'absolute',
  top: '61px', // 헤더 높이만큼 아래에서 시작
  left: 0,
  right: 0,
  height: '256px',
  background: 'linear-gradient(to bottom, #fce7f3, transparent)',
  pointerEvents: 'none',
  zIndex: 0,
});

export const content = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '672px',
  padding: '32px 16px',
});

export const title = style({
  fontSize: '24px',
  fontWeight: '700',
  color: '#333',
  margin: 0,
  marginBottom: '24px',
  textAlign: 'center',
});

export const currentPlanTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#333',
  margin: 0,
  marginBottom: '12px',
  textAlign: 'center',
});

export const compareButton = style({
  padding: '12px 24px',
  backgroundColor: '#fce7f3',
  color: '#333',
  border: '2px solid #E91685',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '700',
  cursor: 'pointer',
  marginBottom: '24px',
  transition: 'background-color 0.2s, border-color 0.2s',
  ':hover': {
    backgroundColor: '#fbcfe8',
    borderColor: '#E91685',
  },
});

export const compareButtonActive = style({
  backgroundColor: '#E91685',
  color: '#fff',
  ':hover': {
    backgroundColor: '#d11473',
  },
});

export const compareActions = style({
  position: 'fixed',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '480px',
  display: 'flex',
  gap: '12px',
  padding: '16px',
  backgroundColor: '#fff',
  boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 999,
});

export const compareConfirmButton = style({
  flex: 1,
  padding: '16px',
  backgroundColor: '#E91685',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'background-color 0.2s, opacity 0.2s',
  ':hover': {
    backgroundColor: '#d11473',
  },
  ':disabled': {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
});

export const compareCancelButton = style({
  flex: 1,
  padding: '16px',
  backgroundColor: '#E91685',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#d11473',
  },
});

export const filterPanel = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
  maxWidth: '288px',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'center',
});

export const filterControls = style({
  display: 'inline-flex',
  gap: '16px',
});

export const selectBase = style({
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  padding: '8px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(4px)',
  fontSize: '14px',
  color: '#000',
  width: '100%',
  appearance: 'none',
  textAlign: 'left',
  cursor: 'pointer',
});

export const selectWrapper = style({
  position: 'relative',
});

export const selectIcon = style({
  position: 'absolute',
  top: '10px',
  right: '12px',
  width: '16px',
  height: '16px',
  pointerEvents: 'none',
  color: '#6b7280',
});

export const filterMenu = style({
  position: 'absolute',
  right: 0,
  zIndex: 10,
  marginTop: '8px',
  width: '288px',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  backgroundColor: '#fff',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const filterSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const filterSectionTitle = style({
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '700',
});

export const filterButtons = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

export const filterButton = style({
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  padding: '4px 8px',
  fontSize: '14px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s',
});

export const filterButtonActive = style({
  backgroundColor: '#fef08a',
});

export const planList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
});

export const planCard = style({
  width: '100%',
  maxWidth: '288px',
  cursor: 'pointer',
  borderRadius: '16px',
  border: '1px solid #9ca3af',
  backgroundColor: '#fff',
  padding: '20px 28px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s, border-color 0.2s',
  textAlign: 'left',
  ':hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
});

export const planCardHeader = style({
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const planProvider = style({
  fontSize: '14px',
  color: '#1f2937',
});

export const planPrice = style({
  fontSize: '14px',
  fontWeight: '600',
  color: '#E91685',
});

export const planName = style({
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '18px',
  fontWeight: '700',
  margin: 0,
  marginBottom: '8px',
});

export const badgeContainer = style({
  marginTop: '8px',
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
  gap: '8px',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const badge = style({
  borderRadius: '9999px',
  border: 'none',
  padding: '4px 8px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
});

export const badgeData = style({
  backgroundColor: '#eef2ff',
  color: '#4f46e5',
});

export const badgeVoice = style({
  backgroundColor: '#ecfdf5',
  color: '#059669',
});

export const badgeSpeed = style({
  backgroundColor: '#fffbeb',
  color: '#d97706',
});

export const badgeSms = style({
  backgroundColor: '#fef2f2',
  color: '#dc2626',
});

export const ottContainer = style({
  marginTop: '12px',
  display: 'flex',
  alignItems: 'center',
});

export const ottCircle = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#d1d5db',
  border: '2px solid #fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
});

export const ottCircleOverlap = style({
  marginLeft: '-12px',
});

export const emptyState = style({
  textAlign: 'center',
  color: '#6b7280',
  padding: '32px 0',
});

export const skeleton = style({
  width: '100%',
  maxWidth: '320px',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  borderRadius: '16px',
  backgroundColor: '#fff',
  padding: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

export const currentPlanCard = style({
  width: '100%',
  maxWidth: '288px',
  cursor: 'pointer',
  borderRadius: '16px',
  border: '1px solid #9ca3af',
  backgroundColor: '#fff',
  padding: '20px 28px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s, border-color 0.2s',
  textAlign: 'left',
  ':hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
});

export const planCardSelected = style({
  border: '2px solid #E91685',
});

export const planCardCompareSelected = style({
  border: '2px solid #E91685',
  backgroundColor: '#fef2f2',
});
