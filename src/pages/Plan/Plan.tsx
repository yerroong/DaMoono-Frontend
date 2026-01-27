import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import { Loading3D } from '@/components/loading';
import { PAGE_PATHS } from '@/shared/config/paths';
import Layout from '../layout/Layout';
import { MOCK_PLANS, OTT_LABELS, SORT_LABELS } from './constants';
import * as styles from './style/Plan.css';
import type {
  NetworkType,
  OTTType,
  Plan as PlanType,
  SortTarget,
} from './types';

// 현재 사용 중인 요금제 카드 컴포넌트
interface CurrentPlanCardProps {
  plan: PlanType;
  isSelected: boolean;
  isCompareMode?: boolean;
  isCompareSelected?: boolean;
  onClick?: (plan: PlanType) => void;
}

function CurrentPlanCard({
  plan,
  isSelected,
  isCompareMode = false,
  isCompareSelected = false,
  onClick,
}: CurrentPlanCardProps) {
  const {
    name,
    price,
    dataAmountMb,
    voiceMinutes,
    smsIncluded,
    overageSpeedMbps,
    subscriptionServices,
  } = plan;

  return (
    <button
      type="button"
      onClick={() => onClick?.(plan)}
      className={`${styles.currentPlanCard} ${isSelected ? styles.planCardSelected : ''} ${isCompareMode && isCompareSelected ? styles.planCardCompareSelected : ''}`}
    >
      <div className={styles.planCardHeader}>
        <span className={styles.planProvider}>LG U+</span>
        <span className={styles.planPrice}>월 {price.toLocaleString()}원</span>
      </div>
      <div className={styles.planName} title={name}>
        {name}
      </div>

      {/* 배지 */}
      <div className={styles.badgeContainer}>
        <span className={`${styles.badge} ${styles.badgeData}`}>
          {dataAmountMb === 0
            ? '무제한'
            : `${(dataAmountMb / 1024).toFixed(1)}GB`}
        </span>
        <span className={`${styles.badge} ${styles.badgeVoice}`}>
          {voiceMinutes === -1 ? '무제한' : `${voiceMinutes}분`}
        </span>
        <span className={`${styles.badge} ${styles.badgeSpeed}`}>
          속도 {overageSpeedMbps ?? 0}Mbps
        </span>
        <span className={`${styles.badge} ${styles.badgeSms}`}>
          혜택 가치 {smsIncluded}
        </span>
      </div>

      {/* OTT 서비스 */}
      {subscriptionServices.length > 0 && (
        <div className={styles.ottContainer}>
          {subscriptionServices.map((service, index) => (
            <div
              key={service}
              className={`${styles.ottCircle} ${index !== 0 ? styles.ottCircleOverlap : ''}`}
              title={OTT_LABELS[service]}
            >
              {OTT_LABELS[service].charAt(0)}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

// 정렬/필터 패널 컴포넌트
interface SortFilterPanelProps {
  selectedNetwork: NetworkType | null;
  setSelectedNetwork: (network: NetworkType | null) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  sortTarget: SortTarget | null;
  setSortTarget: (target: SortTarget | null) => void;
  selectedOttList: OTTType[];
  setSelectedOttList: (ott: OTTType[]) => void;
}

function SortFilterPanel({
  selectedNetwork,
  setSelectedNetwork,
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
  selectedOttList,
  setSelectedOttList,
}: SortFilterPanelProps) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterControls}>
        {/* 정렬 순서 */}
        <div className={styles.selectWrapper} style={{ width: '85px' }}>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className={styles.selectBase}
          >
            <option value="asc">낮은 순</option>
            <option value="desc">높은 순</option>
          </select>
          <svg
            className={styles.selectIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="드롭다운 아이콘"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* 정렬 기준 */}
        <div className={styles.selectWrapper} style={{ width: '96px' }}>
          <select
            value={sortTarget ?? ''}
            onChange={(e) =>
              setSortTarget(
                e.target.value === '' ? null : (e.target.value as SortTarget),
              )
            }
            className={styles.selectBase}
          >
            <option value="" disabled hidden>
              정렬 기준
            </option>
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <svg
            className={styles.selectIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="드롭다운 아이콘"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* 필터 버튼 */}
        <div className={styles.selectWrapper} style={{ width: '80px' }}>
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={styles.selectBase}
          >
            필터링
          </button>
          <svg
            className={styles.selectIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="드롭다운 아이콘"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {/* 필터 메뉴 */}
          {showFilterMenu && (
            <div className={styles.filterMenu}>
              {/* 네트워크 필터 */}
              <div className={styles.filterSection}>
                <div className={styles.filterSectionTitle}>네트워크</div>
                <div className={styles.filterButtons}>
                  {(['LTE', '5G'] as NetworkType[]).map((network) => (
                    <button
                      key={network}
                      className={`${styles.filterButton} ${selectedNetwork === network ? styles.filterButtonActive : ''}`}
                      onClick={() =>
                        setSelectedNetwork(
                          selectedNetwork === network ? null : network,
                        )
                      }
                    >
                      {network}
                    </button>
                  ))}
                </div>
              </div>

              {/* OTT 필터 */}
              <div className={styles.filterSection}>
                <div className={styles.filterSectionTitle}>OTT 혜택</div>
                <div className={styles.filterButtons}>
                  {Object.entries(OTT_LABELS).map(([key, label]) => {
                    const ottKey = key as OTTType;
                    const isSelected = selectedOttList.includes(ottKey);
                    return (
                      <button
                        key={key}
                        className={`${styles.filterButton} ${isSelected ? styles.filterButtonActive : ''}`}
                        onClick={() => {
                          setSelectedOttList(
                            isSelected
                              ? selectedOttList.filter((v) => v !== ottKey)
                              : [...selectedOttList, ottKey],
                          );
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 요금제 카드 컴포넌트
interface PlanCardProps {
  plan: PlanType;
  isSelected: boolean;
  isCompareMode?: boolean;
  isCompareSelected?: boolean;
  onClick?: (plan: PlanType) => void;
}

function PlanCard({
  plan,
  isSelected,
  isCompareMode = false,
  isCompareSelected = false,
  onClick,
}: PlanCardProps) {
  const {
    name,
    price,
    dataAmountMb,
    voiceMinutes,
    smsIncluded,
    overageSpeedMbps,
    subscriptionServices,
  } = plan;

  return (
    <button
      type="button"
      onClick={() => onClick?.(plan)}
      className={`${styles.planCard} ${isSelected ? styles.planCardSelected : ''} ${isCompareMode && isCompareSelected ? styles.planCardCompareSelected : ''}`}
    >
      <div className={styles.planCardHeader}>
        <span className={styles.planProvider}>LG U+</span>
        <span className={styles.planPrice}>월 {price.toLocaleString()}원</span>
      </div>
      <div className={styles.planName} title={name}>
        {name}
      </div>

      {/* 배지 */}
      <div className={styles.badgeContainer}>
        <span className={`${styles.badge} ${styles.badgeData}`}>
          {dataAmountMb === 0
            ? '무제한'
            : `${(dataAmountMb / 1024).toFixed(1)}GB`}
        </span>
        <span className={`${styles.badge} ${styles.badgeVoice}`}>
          {voiceMinutes === -1 ? '무제한' : `${voiceMinutes}분`}
        </span>
        <span className={`${styles.badge} ${styles.badgeSpeed}`}>
          속도 {overageSpeedMbps ?? 0}Mbps
        </span>
        <span className={`${styles.badge} ${styles.badgeSms}`}>
          혜택 가치 {smsIncluded}
        </span>
      </div>

      {/* OTT 서비스 */}
      {subscriptionServices.length > 0 && (
        <div className={styles.ottContainer}>
          {subscriptionServices.map((service, index) => (
            <div
              key={service}
              className={`${styles.ottCircle} ${index !== 0 ? styles.ottCircleOverlap : ''}`}
              title={OTT_LABELS[service]}
            >
              {OTT_LABELS[service].charAt(0)}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

// 메인 페이지 컴포넌트
export default function Plan() {
  const navigate = useNavigate();
  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType | null>(
    null,
  );
  const [selectedOttList, setSelectedOttList] = useState<OTTType[]>([]);
  const [isLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [comparePlans, setComparePlans] = useState<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // 현재 사용 중인 요금제 상태
  const [currentPlan, setCurrentPlan] = useState<PlanType>(() => {
    const savedPlanId = localStorage.getItem('currentPlanId');
    if (savedPlanId) {
      const planId = parseInt(savedPlanId, 10);
      const savedPlan = MOCK_PLANS.find((p) => p.id === planId);
      if (savedPlan) {
        return savedPlan;
      }
    }
    // 저장된 요금제가 없으면 랜덤 선택
    const randomIndex = Math.floor(Math.random() * MOCK_PLANS.length);
    return MOCK_PLANS[randomIndex];
  });

  // localStorage에서 현재 사용중인 요금제 가져오기
  const loadCurrentPlan = useCallback(() => {
    const savedPlanId = localStorage.getItem('currentPlanId');
    if (savedPlanId) {
      const planId = parseInt(savedPlanId, 10);
      const savedPlan = MOCK_PLANS.find((p) => p.id === planId);
      if (savedPlan) {
        setCurrentPlan(savedPlan);
        return;
      }
    }
  }, []);

  // 컴포넌트 마운트 시 및 페이지 포커스 시 localStorage 확인
  useEffect(() => {
    loadCurrentPlan();

    const handleFocus = () => {
      loadCurrentPlan();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadCurrentPlan]);

  // 필터링 및 정렬 로직
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = [...MOCK_PLANS];

    // 네트워크 필터
    if (selectedNetwork) {
      filtered = filtered.filter(
        (plan) => plan.networkType === selectedNetwork,
      );
    }

    // OTT 필터
    if (selectedOttList.length > 0) {
      filtered = filtered.filter((plan) =>
        selectedOttList.some((ott) => plan.subscriptionServices.includes(ott)),
      );
    }

    // 정렬
    if (sortTarget) {
      filtered.sort((a, b) => {
        let aValue: number;
        let bValue: number;

        switch (sortTarget) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'dataAmountMb':
            aValue = a.dataAmountMb;
            bValue = b.dataAmountMb;
            break;
          case 'voiceMinutes':
            aValue = a.voiceMinutes;
            bValue = b.voiceMinutes;
            break;
          case 'overageSpeedMbps':
            aValue = a.overageSpeedMbps ?? 0;
            bValue = b.overageSpeedMbps ?? 0;
            break;
          case 'smsIncluded':
            aValue = a.smsIncluded;
            bValue = b.smsIncluded;
            break;
          default:
            return 0;
        }

        if (sortOrder === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return filtered;
  }, [selectedNetwork, selectedOttList, sortTarget, sortOrder]);

  const handlePlanClick = (plan: PlanType) => {
    if (isCompareMode) {
      // 비교 모드: 카드 선택/해제
      if (comparePlans.includes(plan.id)) {
        setComparePlans(comparePlans.filter((id) => id !== plan.id));
      } else if (comparePlans.length < 2) {
        setComparePlans([...comparePlans, plan.id]);
      }
    } else {
      // 일반 모드: 상세보기로 이동
      setSelectedPlanId(plan.id);
      navigate(PAGE_PATHS.PLAN_DETAIL.replace(':id', plan.id.toString()));
    }
  };

  const handleCompareClick = () => {
    if (comparePlans.length === 2) {
      navigate(PAGE_PATHS.PLAN_COMPARE, {
        state: { plan1Id: comparePlans[0], plan2Id: comparePlans[1] },
      });
    }
  };

  const handleCancelCompare = () => {
    setIsCompareMode(false);
    setComparePlans([]);
  };

  return (
    <Layout>
      <Header />

      <div className={styles.container}>
        <div className={styles.gradientBg} />

        <div className={styles.content} ref={listRef}>
          {/* 헤더 */}
          <div style={{ marginBottom: '24px' }}>
            <h1 className={styles.title}>요금제 목록</h1>
          </div>

          {/* 문어 */}
          <div
            style={{ width: '200px', height: '200px', marginBottom: '24px' }}
          >
            <Loading3D
              textureUrl="src/assets/images/search-moono.png"
              size="lg"
              floatSpeed={1.8}
              rotation={0.3}
            />
          </div>

          {/* 비교하기 버튼 */}
          <button
            type="button"
            className={`${styles.compareButton} ${isCompareMode ? styles.compareButtonActive : ''}`}
            onClick={() => setIsCompareMode(!isCompareMode)}
          >
            요금제 한눈에 비교하기!! click!!
          </button>

          {/* 현재 사용 중인 요금제 */}
          <div
            style={{
              marginBottom: '24px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2 className={styles.currentPlanTitle}>현재 사용중인 요금제</h2>
            <CurrentPlanCard
              plan={currentPlan}
              isSelected={selectedPlanId === currentPlan.id}
              isCompareMode={isCompareMode}
              isCompareSelected={comparePlans.includes(currentPlan.id)}
              onClick={handlePlanClick}
            />
          </div>

          {/* 정렬/필터 패널 */}
          <SortFilterPanel
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortTarget={sortTarget}
            setSortTarget={setSortTarget}
            selectedOttList={selectedOttList}
            setSelectedOttList={setSelectedOttList}
          />

          {/* 요금제 리스트 */}
          <div className={styles.planList}>
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => i).map((i) => (
                  <div key={`skeleton-${i}`} className={styles.skeleton}>
                    <div
                      style={{
                        height: '16px',
                        width: '80px',
                        backgroundColor: '#d1d5db',
                        borderRadius: '4px',
                        marginBottom: '4px',
                      }}
                    />
                    <div
                      style={{
                        height: '20px',
                        width: '120px',
                        backgroundColor: '#d1d5db',
                        borderRadius: '4px',
                        marginBottom: '8px',
                      }}
                    />
                  </div>
                ))
              : filteredAndSortedPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlanId === plan.id}
                    isCompareMode={isCompareMode}
                    isCompareSelected={comparePlans.includes(plan.id)}
                    onClick={handlePlanClick}
                  />
                ))}
          </div>

          {/* 결과 없음 */}
          {!isLoading && filteredAndSortedPlans.length === 0 && (
            <div className={styles.emptyState}>
              조건에 맞는 요금제가 없습니다.
            </div>
          )}

          {/* 비교 모드 하단 버튼 */}
          {isCompareMode && (
            <div className={styles.compareActions}>
              <button
                type="button"
                className={styles.compareConfirmButton}
                onClick={handleCompareClick}
                disabled={comparePlans.length !== 2}
              >
                비교하기 ({comparePlans.length}/2)
              </button>
              <button
                type="button"
                className={styles.compareCancelButton}
                onClick={handleCancelCompare}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}
