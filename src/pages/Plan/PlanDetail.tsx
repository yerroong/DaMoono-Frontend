import { useNavigate, useParams } from 'react-router';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import { PAGE_PATHS } from '@/shared/config/paths';
import Layout from '../layout/Layout';
import { MOCK_PLANS, OTT_LABELS } from './constants';
import * as styles from './style/PlanDetail.css';

export default function PlanDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const planId = id ? parseInt(id, 10) : null;
  const plan = planId ? MOCK_PLANS.find((p) => p.id === planId) : null;

  if (!plan) {
    return (
      <Layout>
        <Header />
        <div className={styles.container}>
          <div className={styles.errorMessage}>요금제를 찾을 수 없습니다.</div>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(PAGE_PATHS.PLAN)}
          >
            목록으로 돌아가기
          </button>
        </div>
        <BottomNav />
      </Layout>
    );
  }

  const {
    name,
    price,
    dataAmountMb,
    voiceMinutes,
    smsIncluded,
    overageSpeedMbps,
    networkType,
    subscriptionServices,
  } = plan;

  return (
    <Layout>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(PAGE_PATHS.PLAN)}
          >
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>요금제 상세</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.provider}>LG U+</span>
            <span className={styles.price}>월 {price.toLocaleString()}원</span>
          </div>

          <h2 className={styles.planName}>{name}</h2>

          {/* 네트워크 타입 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>네트워크</div>
            <div className={styles.badge}>{networkType}</div>
          </div>

          {/* 데이터 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>데이터</div>
            <div className={styles.value}>
              {dataAmountMb === 0
                ? '무제한'
                : `${(dataAmountMb / 1024).toFixed(1)}GB`}
            </div>
            {dataAmountMb !== 0 && overageSpeedMbps && (
              <div className={styles.subValue}>
                초과 시 속도: {overageSpeedMbps}Mbps
              </div>
            )}
          </div>

          {/* 음성통화 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>음성통화</div>
            <div className={styles.value}>
              {voiceMinutes === -1 ? '무제한' : `${voiceMinutes}분`}
            </div>
          </div>

          {/* 문자 */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>문자</div>
            <div className={styles.value}>{smsIncluded}건</div>
          </div>

          {/* OTT 서비스 */}
          {subscriptionServices.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>OTT 혜택</div>
              <div className={styles.ottList}>
                {subscriptionServices.map((service) => (
                  <div key={service} className={styles.ottItem}>
                    {OTT_LABELS[service]}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 신청 버튼 */}
          <button type="button" className={styles.applyButton}>
            이 요금제 신청하기
          </button>
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}
