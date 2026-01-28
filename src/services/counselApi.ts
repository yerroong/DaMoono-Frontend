import type { CounselItem } from '@/pages/MyPage/types/counsel';

export async function getCounselSummary(sessionId: string | null) {
  const res = await fetch(`/summary/consults/${sessionId}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  });

  if (!res.ok) {
    throw new Error('상담 내역 조회 실패');
  }

  const data: CounselItem[] = await res.json();
  return data;
}
