# 🐙 다무너 (DaMoono)

> **AI 기반 통신사 요금제 추천 및 실시간 상담 서비스**

**다무너(DaMoono)**는 사용자의 통신 사용 패턴과 성향을 분석하여
가장 적합한 요금제를 추천하고,
AI 챗봇 → 실시간 상담사 연결까지 이어지는 **엔드투엔드 상담 경험**을 제공하는 웹 서비스입니다.

---

## 📌 프로젝트 개요

| 항목    | 내용                        |
| ----- | ------------------------- |
| 프로젝트명 | 다무너 (DaMoono)             |
| 주제    | AI 기반 통신사 요금제 추천 & 실시간 상담 |
| 타겟    | 통신 요금제 선택에 어려움을 겪는 사용자    |
| 개발 기간 | 2025.01 ~ 진행 중            |
| 팀 구성  | Frontend / Backend / AI   |

---

## 🖼️ 서비스 미리보기

### 메인 화면 & 요금제 추천

<p align="center">
  <img src="./assets/screenshots/home.png" width="30%" />
  <img src="./assets/screenshots/chat.png" width="30%" />
  <img src="./assets/screenshots/plan.png" width="30%" />
</p>

---

### 🎬 시연 영상

* 🔗 **서비스 시연 영상 (YouTube)**
  [https://youtube.com/your-demo-link](https://youtube.com/your-demo-link)

```md
![demo](./assets/demo/demo.gif)
```

---

## 🔧 주요 기능 소개

> 기능은 **미리보기 → 설명** 구조로 구성되어 있습니다.

---

### 🤖 AI 챗봇 요금제 추천 (텍스트 / 음성)

| 기능 미리보기                                                | 기능 설명                                                                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="./assets/features/chatbot.gif" width="350"/> | - LangChain + OpenAI 기반 대화형 요금제 추천<br/>- 텍스트 / 음성 입력 모두 지원<br/>- 사용자 성향 및 사용 패턴 분석 기반 추천<br/>- **정확 모드 / 자연 모드** 전환 가능<br/>- 대화 이탈 후 재접속 시 컨텍스트 유지 |

---

### 💬 실시간 1:1 상담 시스템 (WebSocket)

| 기능 미리보기                                                | 기능 설명                                                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| <img src="./assets/features/consult.gif" width="350"/> | - Socket.IO 기반 실시간 양방향 통신<br/>- 사용자 ↔ 상담사 1:1 세션 매칭<br/>- 대기 세션 실시간 관리<br/>- 상담 시작 / 종료 이벤트 처리 |

---

### 📊 요금제 탐색 & 비교

| 기능 미리보기                                                     | 기능 설명                                                                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| <img src="./assets/features/plan-compare.png" width="350"/> | - 통신망(LTE/5G), 가격, 혜택 기반 필터링<br/>- Chart.js 기반 요금제 비교 시각화<br/>- 현재 요금제 vs 추천 요금제 비교<br/>- FlipCard UI 및 애니메이션 적용 |

---

### 🎭 성향 테스트 기반 추천

| 기능 미리보기                                                         | 기능 설명                                                                   |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="./assets/features/personality-test.gif" width="350"/> | - 6가지 카테고리 기반 성향 테스트<br/>- 사용자 응답 기반 통신 성향 도출<br/>- 성향 결과에 따른 요금제 자동 추천 |

---

### 📱 채팅 모드 구성

| 기능 미리보기                                                  | 기능 설명                                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="./assets/features/chat-mode.png" width="350"/> | - 일반 채팅: AI 챗봇 상담<br/>- 상담 채팅: 실시간 상담사 연결<br/>- 관리자 모드: 상담 세션 관리<br/>- 매뉴얼 모드: FAQ 제공 |

---

## 🧠 서비스 플로우

### 사용자 플로우 차트

<p align="center">
  <img src="./assets/flow/user-flow.png" width="80%" />
</p>

```
성향 테스트
 → AI 챗봇 추천
 → 요금제 비교
 → 실시간 상담
 → 요금제 선택
```

---

## 🏗️ 시스템 아키텍처

<p align="center">
  <img src="./assets/architecture/system-architecture.png" width="90%" />
</p>

```
Frontend (React + Vite)
 ├─ AI 챗봇 UI
 ├─ 요금제 탐색
 ├─ 실시간 상담 UI
        ↓
Backend (Express)
 ├─ REST API
 ├─ WebSocket Server
        ↓
External
 └─ OpenAI API (LangChain)
```

---

## ⚔️ 기술 스택

### 🖥 Frontend

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vanilla_Extract-000000?style=flat"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white"/>
</p>

### 🧠 Backend / AI

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express"/>
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io"/>
  <img src="https://img.shields.io/badge/LangChain-0FA958?style=flat"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white"/>
</p>

### 🛠 Dev Tools

<p>
  <img src="https://img.shields.io/badge/Biome-60A5FA?style=flat"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint"/>
  <img src="https://img.shields.io/badge/Lefthook-000000?style=flat"/>
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat"/>
</p>

---

## 👥 팀원 및 역할 소개

| 프로필                                              | 이름      | 주요 역할 및 기여                                            |
| ------------------------------------------------ | ------- | ----------------------------------------------------- |
| <img src="./assets/team/eunbi.png" width="80"/>  | **이은비** | - 프로젝트 기획 총괄<br/>- 음성 기반 AI 챗봇 구현<br/>- 요금제 추천 플로우 설계 |
| <img src="./assets/team/eunseo.png" width="80"/> | **박은서** | - WebSocket 서버 설계<br/>- 실시간 세션 관리<br/>- DB 모델링 및 ERD  |
| <img src="./assets/team/heejun.png" width="80"/> | **박희준** | - 요금제 비교 시각화<br/>- 필터/정렬 UI 구현                        |
| <img src="./assets/team/minji.png" width="80"/>  | **안민지** | - 성향 테스트 UI/콘텐츠 설계<br/>- 결과 페이지 구현                    |
| <img src="./assets/team/dahee.png" width="80"/>  | **정다희** | - 인증/접근 제어 설계<br/>- 온보딩 UI 구현                         |
| <img src="./assets/team/junho.png" width="80"/>  | **허준호** | - OpenAI 챗봇 로직 설계<br/>- 응답 파싱 및 추천 시스템                |

---

## 🚀 설치 및 실행

### 사전 요구사항

* Node.js 18+
* npm / yarn
* OpenAI API Key

### 실행 방법

```bash
# Backend
cd DaMoono-Backend
npm install
npm run dev

# Frontend
cd DaMoono-Frontend
npm install
npm run dev
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

---

## 📄 라이선스

ISC License

---

**Made with ❤️ by DaMoono Team**
