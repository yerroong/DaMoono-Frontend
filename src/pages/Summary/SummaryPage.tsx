import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav/BottomNav';
import Header from '@/components/Header/Header';
import Layout from '@/pages/layout/Layout';
import CharacterScene from './CharacterScene';
import * as s from './SummaryPage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 자식 컴포넌트들이 0.2초 간격으로 등장
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SummaryPage = () => {
  return (
    // 1. 전체 레이아웃 틀로 감싸기
    <Layout>
      {/* 2. 헤더 */}
      <Header />

      {/* 3. 실제 콘텐츠 영역 */}
      <motion.div
        className={s.pageContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className={s.characterSection} variants={itemVariants}>
          <CharacterScene />
        </motion.section>

        <motion.section className={s.contentSection} variants={itemVariants}>
          <div className={s.cardDummy}>상담 결과 요약 섹션</div>
        </motion.section>

        <motion.section className={s.contentSection} variants={itemVariants}>
          <div className={s.cardDummy}>현재 적용 상태 섹션</div>
        </motion.section>

        <motion.section className={s.contentSection} variants={itemVariants}>
          <div className={s.cardDummy}>이용 가이드 섹션</div>
        </motion.section>
      </motion.div>

      {/* 4. 네비게이션 */}
      <BottomNav />
    </Layout>
  );
};

export default SummaryPage;
