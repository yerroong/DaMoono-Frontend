import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import * as admin from '../Admin/style/Admin.css';
import * as styles from '../Home/style/Home.css';
import Layout from '../layout/Layout';

export default function Admin() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* 헤더 */}
        <Header />

        {/* 헤더 */}
        <div className={admin.header}>
          <h1>관리자 페이지</h1>
          <h4>
            상담 요약 이용 고객 수 <span className={admin.count}>700</span>명
          </h4>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}
