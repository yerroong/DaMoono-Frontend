import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';
import moonerbot from '@/assets/images/moonerbot.png';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import socketService from '@/services/socketService';
import Layout from '../layout/Layout';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import ConsultModal from './components/ConsultModal';
import VoiceRecorder, {
  type VoiceRecorderRef,
} from './components/VoiceRecorder';
import * as styles from './style/ChatConsultPage.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type ModalType = 'connecting' | 'endConsult' | 'summary' | 'summarizing' | null;

export default function ChatConsultPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [_sessionId, setSessionId] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>('connecting');
  const contentRef = useRef<HTMLDivElement>(null);
  const voiceRecorderRef = useRef<VoiceRecorderRef>(null);

  // Socket 연결 및 이벤트 리스너 설정
  useEffect(() => {
    socketService.connect();

    // 세션 생성
    socketService.onSessionCreated((id) => {
      setSessionId(id);
    });

    // 상담사 연결
    socketService.onConsultantConnected(() => {
      setIsConnected(true);
      setModalType(null);
    });

    // 메시지 수신
    socketService.onMessage((data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: data.sender === 'user' ? 'user' : 'assistant',
          content: data.message,
          timestamp: new Date(data.timestamp),
        },
      ]);
    });

    // 상담 종료
    socketService.onConsultEnded(() => {
      alert('상담이 종료되었습니다.');
      navigate('/chat');
    });

    // 상담 시작 - 사용자 정보 가져오기
    const userName = localStorage.getItem('userName');

    socketService.startConsult(`user-${Date.now()}`, userName || undefined);

    return () => {
      socketService.disconnect();
    };
  }, [navigate]);

  // 메시지가 추가될 때마다 스크롤을 아래로
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  });

  const handleSendMessage = async (content: string) => {
    // Socket으로만 메시지 전송 (로컬 상태에 추가하지 않음)
    socketService.sendMessage(content, 'user');
    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleEndConsult = () => {
    setModalType('endConsult');
  };

  const handleConfirmEndConsult = () => {
    socketService.endConsult();
    setModalType(null);
    navigate('/chat');
  };

  const handleSummary = () => {
    setModalType('summary');
  };

  const handleConfirmSummary = () => {
    setModalType('summarizing');

    // 요약 API 호출 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      socketService.endConsult();
      setModalType(null);
      // TODO: 요약 결과 페이지로 이동
      navigate('/mypage');
    }, 3000);
  };

  const handleCloseModal = () => {
    if (modalType === 'connecting') {
      // 연결 취소
      socketService.endConsult();
      navigate('/chat');
    } else {
      setModalType(null);
    }
  };

  const handleBack = () => {
    if (confirm('상담을 종료하고 돌아가시겠습니까?')) {
      socketService.endConsult();
      navigate('/chat');
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      {/* 모달 */}
      {modalType && (
        <ConsultModal
          type={modalType}
          isOpen={!!modalType}
          onClose={
            modalType === 'connecting' ||
            modalType === 'endConsult' ||
            modalType === 'summary'
              ? handleCloseModal
              : undefined
          }
          onConfirm={
            modalType === 'endConsult'
              ? handleConfirmEndConsult
              : modalType === 'summary'
                ? handleConfirmSummary
                : undefined
          }
        />
      )}

      {/* 녹음 컴포넌트 */}
      <VoiceRecorder
        ref={voiceRecorderRef}
        onTranscript={(text) => {
          handleSendMessage(text);
        }}
        isListening={isListening}
        onListeningChange={setIsListening}
      />

      <Header />

      <div className={styles.container}>
        {/* 헤더 */}
        <ChatHeader
          title="상담사와 대화하기"
          showActions={true}
          showBackButton={true}
          onEndConsult={handleEndConsult}
          onSummary={handleSummary}
          onBack={handleBack}
        />

        {/* 상담 상태 */}
        <div className={styles.statusContainer}>
          <div className={styles.statusHeader}>
            <div className={styles.statusIndicator}>
              <div
                className={styles.statusDot}
                style={{ backgroundColor: isConnected ? '#1FFF6A' : '#FF1F1F' }}
              />
              <span className={styles.statusText}>
                {isConnected ? '상담사 연결됨' : '실시간 상담 서비스'}
              </span>
            </div>
          </div>
          <p className={styles.statusSubtext}>
            {isConnected
              ? '상담사와 실시간 대화 중입니다'
              : '평균 답장 소요시간 5분 이내'}
          </p>
        </div>

        {/* 메시지 영역 */}
        <div className={styles.content} ref={contentRef}>
          {/* Messages */}
          {messages.length > 0 && (
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div key={message.id} className={styles.messageWrapper}>
                  {message.role === 'user' ? (
                    <div className={styles.userMessageContainer}>
                      <div className={styles.userMessage}>
                        <p className={styles.userText}>{message.content}</p>
                      </div>
                      <span className={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.assistantMessageContainer}>
                      <div className={styles.assistantHeader}>
                        <img
                          src={moonerbot}
                          alt="상담사"
                          className={styles.botIcon}
                        />
                        <span className={styles.botName}>상담사</span>
                      </div>
                      <div className={styles.assistantMessage}>
                        <div className={styles.assistantText}>
                          {message.content ? (
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p>{children}</p>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <div className={styles.loadingDots}>
                              <div className={styles.loadingDot} />
                              <div className={styles.loadingDot} />
                              <div className={styles.loadingDot} />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 입력 영역 */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onClearChat={handleClearChat}
          voiceRecorderRef={voiceRecorderRef}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </div>

      <BottomNav />
    </Layout>
  );
}
