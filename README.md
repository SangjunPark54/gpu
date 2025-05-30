# GPU Management Web Application

AXMP 스타일의 GPU 리소스 관리 대시보드 웹 애플리케이션입니다.

## 🚀 주요 기능

### 📊 대시보드
- GPU 리소스 현황 실시간 모니터링
- 메트릭 카드를 통한 시각적 데이터 표시
- 사용률 및 가용성 추적

### 🔧 GPU Pool 관리
- GPU Pool 생성, 수정, 삭제
- 프로젝트별 GPU 할당 관리
- 상태별 필터링 및 정렬

### 📋 요청 관리
- GPU 리소스 요청 승인/거부
- 대기 중인 요청 목록 관리
- 프로젝트별 요청 추적

## 🛠 기술 스택

- **Frontend**: Vue 3 + Nuxt 3
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Charts**: Chart.js + Vue-ChartJS
- **Icons**: Heroicons
- **UI Components**: Headless UI

## 📁 프로젝트 구조

```
gpu-management-app/
├── .rules/                    # 개발 규칙 및 가이드라인
│   ├── .cursorrules
│   ├── dashboard-ui-guidelines.mdc
│   ├── vue-nuxt-general-rules.mdc
│   ├── html-specific-rules.mdc
│   └── css-specific-rules.mdc
├── assets/
│   └── css/
│       └── main.css           # TailwindCSS + 커스텀 스타일
├── components/
│   └── gpu/
│       └── GpuPoolModal.vue   # GPU Pool 생성/편집 모달
├── composables/
│   └── useGpuApi.ts          # GPU API 호출 composable
├── pages/
│   └── gpu/
│       └── dashboard.vue      # GPU 관리 대시보드
├── nuxt.config.ts            # Nuxt 3 설정
├── package.json              # 의존성 관리
└── README.md
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Indigo (#4F46E5)
- **Success**: Green (#10B981)
- **Warning**: Yellow/Orange (#F59E0B)
- **Danger**: Red (#EF4444)
- **Info**: Blue (#3B82F6)

### 컴포넌트 스타일
- **카드**: 둥근 모서리, 미묘한 그림자, 컬러 보더
- **버튼**: 일관된 패딩, 호버 효과, 포커스 링
- **테이블**: 정렬 가능한 헤더, 줄무늬 배경
- **모달**: 오버레이, 애니메이션, 접근성 지원

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 프로덕션 미리보기
```bash
npm run preview
```

## 🔧 환경 설정

### 환경 변수
```bash
# .env
API_BASE_URL=http://localhost:8080/api/core/v1
BACKEND_URL=http://localhost:8080
API_SECRET=your-secret-key
```

### API 프록시 설정
개발 환경에서 백엔드 API와의 통신을 위해 Nitro 프록시가 설정되어 있습니다.

## 📡 API 엔드포인트

### GPU Pool 관리
- `GET /api/core/v1/realms/{realm}/gpus/pool-list` - GPU Pool 목록 조회
- `POST /api/core/v1/realms/{realm}/gpus/pools` - GPU Pool 생성
- `PUT /api/core/v1/realms/{realm}/gpus/pools/{poolName}` - GPU Pool 수정
- `DELETE /api/core/v1/realms/{realm}/gpus/pools/{poolName}` - GPU Pool 삭제

### 통계 및 모니터링
- `GET /api/core/v1/realms/{realm}/gpus/count` - GPU 통계 조회
- `GET /api/core/v1/realms/{realm}/gpus/project/{project}/count` - 프로젝트별 GPU 통계

### 요청 관리
- `GET /api/core/v1/realms/{realm}/gpus/pool-requests` - GPU 요청 목록
- `PUT /api/core/v1/realms/{realm}/gpus/pool-requests/{reqId}/approve` - 요청 승인

## 🎯 개발 가이드라인

### 코딩 규칙
- Vue 3 Composition API 사용
- TypeScript 타입 안전성 준수
- TailwindCSS 클래스만 사용 (CSS/style 태그 금지)
- 접근성 기능 구현 필수
- Early return 패턴 사용
- 설명적인 변수/함수명 사용

### 컴포넌트 네이밍
- 이벤트 핸들러: `handle` 접두사 (예: `handleClick`)
- 함수 대신 const 사용: `const toggle = () =>`
- 타입 정의 권장

### 접근성
- `tabindex`, `aria-label` 속성 추가
- 키보드 네비게이션 지원
- 스크린 리더 친화적 구조
- 고대비 색상 사용

## 🧪 테스트

```bash
# 타입 체크
npm run type-check

# 린팅
npm run lint

# 린팅 자동 수정
npm run lint:fix
```

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 🤝 기여하기

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요. 