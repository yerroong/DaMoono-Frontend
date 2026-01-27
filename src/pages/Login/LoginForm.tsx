import { useState } from 'react';
import { useNavigate } from 'react-router';
import mascot from '@/assets/images/search-moono.png';
import { login } from '@/services/authApi';
import { PAGE_PATHS } from '@/shared/config/paths';
import Layout from '../layout/Layout';
import * as styles from './style/LoginForm.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userId.trim() || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await login({ userId, password });
      if (data.success) {
        // 로그인 성공 시 사용자 정보 저장 (선택사항)
        localStorage.setItem('userName', data.data.name);
        localStorage.setItem('userRole', data.data.role);

        navigate(PAGE_PATHS.HOME);
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '로그인 중 오류가 발생했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate(PAGE_PATHS.SIGNUP);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={mascot} alt="무너" className={styles.mascot} />
          <div className={styles.speechBubble}>다 무 너</div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="userId" className={styles.label}>
              아이디
            </label>
            <input
              id="userId"
              type="text"
              className={styles.input}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          <button
            type="button"
            className={styles.signupText}
            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </div>
      </div>
    </Layout>
  );
}
