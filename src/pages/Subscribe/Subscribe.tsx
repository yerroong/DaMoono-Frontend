import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import { Loading3D } from '@/components/loading';
import Layout from '../layout/Layout';
import {
  CATEGORY_LABELS,
  MOCK_SUBSCRIBES,
  SORT_LABELS,
  SUBSCRIBE_IMAGES,
} from './constants';
import * as styles from './style/Subscribe.css';
import type {
  CategoryType,
  SortTarget,
  Subscribe as SubscribeType,
} from './types';

// 현재 사용 중인 구독 카드 컴포넌트
interface CurrentSubscribeCardProps {
  subscribe: SubscribeType;
  isSelected: boolean;
  onClick?: (subscribe: SubscribeType) => void;
}

function CurrentSubscribeCard({
  subscribe,
  isSelected,
  onClick,
}: CurrentSubscribeCardProps) {
  const { name, monthlyPrice, category, badges } = subscribe;
  const subscribeImage = SUBSCRIBE_IMAGES[name] || null;

  return (
    <button
      type="button"
      onClick={() => onClick?.(subscribe)}
      className={`${styles.currentSubscribeCard} ${isSelected ? styles.subscribeCardSelected : ''}`}
    >
      <div className={styles.cardHeader}>
        <span className={styles.category}>{CATEGORY_LABELS[category]}</span>
        <span className={styles.price}>
          월 {monthlyPrice.toLocaleString()}원
        </span>
      </div>
      <div className={styles.subscribeName} title={name}>
        {name}
      </div>

      {/* 배지 */}
      <div className={styles.badgeContainer}>
        {badges.length > 0 ? (
          badges.map((badge) => (
            <span
              key={badge}
              className={`${styles.badge} ${styles.badgeHighlight}`}
            >
              {badge}
            </span>
          ))
        ) : (
          <span className={`${styles.badge} ${styles.badgeCategory}`}>
            {CATEGORY_LABELS[category]}
          </span>
        )}
      </div>

      {/* 구독 서비스 원형 아이콘 */}
      <div className={styles.subscribeContainer}>
        <div className={styles.subscribeCircle} title={name}>
          {subscribeImage ? (
            <img
              src={subscribeImage}
              alt={name}
              className={styles.subscribeImage}
            />
          ) : (
            name.charAt(0)
          )}
        </div>
      </div>
    </button>
  );
}

// 정렬/필터 패널 컴포넌트
interface SortFilterPanelProps {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  sortTarget: SortTarget | null;
  setSortTarget: (target: SortTarget | null) => void;
  selectedCategories: CategoryType[];
  setSelectedCategories: (categories: CategoryType[]) => void;
}

function SortFilterPanel({
  sortOrder,
  setSortOrder,
  sortTarget,
  setSortTarget,
  selectedCategories,
  setSelectedCategories,
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
              {/* 카테고리 필터 */}
              <div className={styles.filterSection}>
                <div className={styles.filterSectionTitle}>카테고리</div>
                <div className={styles.filterButtons}>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
                    const categoryKey = key as CategoryType;
                    const isSelected = selectedCategories.includes(categoryKey);
                    return (
                      <button
                        key={key}
                        className={`${styles.filterButton} ${isSelected ? styles.filterButtonActive : ''}`}
                        onClick={() => {
                          setSelectedCategories(
                            isSelected
                              ? selectedCategories.filter(
                                  (v) => v !== categoryKey,
                                )
                              : [...selectedCategories, categoryKey],
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

// 구독 카드 컴포넌트
interface SubscribeCardProps {
  subscribe: SubscribeType;
  onClick?: (subscribe: SubscribeType) => void;
}

function SubscribeCard({ subscribe, onClick }: SubscribeCardProps) {
  const { name, monthlyPrice, category, badges } = subscribe;
  const subscribeImage = SUBSCRIBE_IMAGES[name] || null;

  return (
    <button
      type="button"
      onClick={() => onClick?.(subscribe)}
      className={styles.subscribeCard}
    >
      <div className={styles.cardHeader}>
        <span className={styles.category}>{CATEGORY_LABELS[category]}</span>
        <span className={styles.price}>
          월 {monthlyPrice.toLocaleString()}원
        </span>
      </div>
      <div className={styles.subscribeName} title={name}>
        {name}
      </div>

      {/* 배지 */}
      <div className={styles.badgeContainer}>
        {badges.length > 0 ? (
          badges.map((badge) => (
            <span
              key={badge}
              className={`${styles.badge} ${styles.badgeHighlight}`}
            >
              {badge}
            </span>
          ))
        ) : (
          <span className={`${styles.badge} ${styles.badgeCategory}`}>
            {CATEGORY_LABELS[category]}
          </span>
        )}
      </div>

      {/* 구독 서비스 원형 아이콘 */}
      <div className={styles.subscribeContainer}>
        <div className={styles.subscribeCircle} title={name}>
          {subscribeImage ? (
            <img
              src={subscribeImage}
              alt={name}
              className={styles.subscribeImage}
            />
          ) : (
            name.charAt(0)
          )}
        </div>
      </div>
    </button>
  );
}

// 메인 페이지 컴포넌트
export default function Subscribe() {
  const navigate = useNavigate();
  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    [],
  );
  const [isLoading] = useState(false);
  const [selectedSubscribeId, setSelectedSubscribeId] = useState<number | null>(
    null,
  );
  const listRef = useRef<HTMLDivElement>(null);

  // 현재 사용 중인 구독 상태
  const [currentSubscribe, setCurrentSubscribe] = useState<SubscribeType>(
    () => {
      const savedSubscribeId = localStorage.getItem('currentSubscribeId');
      if (savedSubscribeId) {
        const subscribeId = parseInt(savedSubscribeId, 10);
        const savedSubscribe = MOCK_SUBSCRIBES.find(
          (s) => s.id === subscribeId,
        );
        if (savedSubscribe) {
          return savedSubscribe;
        }
      }
      // 저장된 구독이 없으면 랜덤 선택
      const randomIndex = Math.floor(Math.random() * MOCK_SUBSCRIBES.length);
      return MOCK_SUBSCRIBES[randomIndex];
    },
  );

  // localStorage에서 현재 사용중인 구독 가져오기
  const loadCurrentSubscribe = useCallback(() => {
    const savedSubscribeId = localStorage.getItem('currentSubscribeId');
    if (savedSubscribeId) {
      const subscribeId = parseInt(savedSubscribeId, 10);
      const savedSubscribe = MOCK_SUBSCRIBES.find((s) => s.id === subscribeId);
      if (savedSubscribe) {
        setCurrentSubscribe(savedSubscribe);
        return;
      }
    }
  }, []);

  // 컴포넌트 마운트 시 및 페이지 포커스 시 localStorage 확인
  useEffect(() => {
    loadCurrentSubscribe();

    const handleFocus = () => {
      loadCurrentSubscribe();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadCurrentSubscribe]);

  // 필터링 및 정렬 로직
  const filteredAndSortedSubscribes = useMemo(() => {
    let filtered = [...MOCK_SUBSCRIBES];

    // 카테고리 필터
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((subscribe) =>
        selectedCategories.includes(subscribe.category),
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
          case 'monthlyPrice':
            aValue = a.monthlyPrice;
            bValue = b.monthlyPrice;
            break;
          case 'benefits':
            aValue = a.benefits.length;
            bValue = b.benefits.length;
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
  }, [selectedCategories, sortTarget, sortOrder]);

  const handleSubscribeClick = (subscribe: SubscribeType) => {
    setSelectedSubscribeId(subscribe.id);
    navigate(`/subscribe/${subscribe.id}`);
  };

  return (
    <Layout>
      <Header />

      <div className={styles.container}>
        <div className={styles.gradientBg} />

        <div className={styles.content} ref={listRef}>
          {/* 헤더 */}
          <div style={{ marginBottom: '24px' }}>
            <h1 className={styles.title}>구독 서비스 목록</h1>
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

          {/* 현재 사용 중인 구독 */}
          <div
            style={{
              marginBottom: '24px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2 className={styles.currentSubscribeTitle}>현재 사용중인 구독</h2>
            <CurrentSubscribeCard
              subscribe={currentSubscribe}
              isSelected={selectedSubscribeId === currentSubscribe.id}
              onClick={handleSubscribeClick}
            />
          </div>

          {/* 정렬/필터 패널 */}
          <SortFilterPanel
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortTarget={sortTarget}
            setSortTarget={setSortTarget}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {/* 구독 리스트 */}
          <div className={styles.subscribeList}>
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
              : filteredAndSortedSubscribes.map((subscribe) => (
                  <SubscribeCard
                    key={subscribe.id}
                    subscribe={subscribe}
                    onClick={handleSubscribeClick}
                  />
                ))}
          </div>

          {/* 결과 없음 */}
          {!isLoading && filteredAndSortedSubscribes.length === 0 && (
            <div className={styles.emptyState}>
              조건에 맞는 구독 서비스가 없습니다.
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}
