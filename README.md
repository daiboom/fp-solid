# 함수형 프로그래밍으로 모던 SOLID 원칙 구현하기

함수형 프로그래밍 패러다임과 모던 SOLID 원칙을 적용한 결제 시스템 예제 프로젝트입니다. 간결한 구조로 핵심 개념을 구현했으며, **Zero Dependency**로 개발되어 node_modules가 필요하지 않습니다.

## ✨ 주요 기능

- **🧩 모듈화 설계**: 각 컴포넌트가 명확한 책임 분리
- **🔒 타입 안정성**: TypeScript로 구현된 강력한 유형 시스템
- **🧪 테스트 커버리지**: 핵심 로직 100% 단위 테스트 적용

## 🛠 기술 스택

- **Language**: TypeScript 5.0
- **Runtime**: Node.js 18+
- **Tooling**: TSX (TypeScript 실행 환경)
- **Testing**: Native Assertions

## 📦 설치

### 1. 프로젝트 클론

```
git@github.com:daiboom/fp-solid.git
cd fp-solid
```

### 2. TSX 전역 설치 (TypeScript 실행기)

```bash
$ npm install -g tsx
```

### 3. 테스트 실행

```bash
$ tsx src/payment/payment.test.ts
```

## 프로젝트 구조

```bash
src/
├── payment/
│ ├── types.ts # 타입 정의 (PaymentRequest, PaymentResult)
│ ├── calculations.ts # 순수 계산 함수 모듈
│ ├── processor.ts # 결제 프로세스 조합
│ └── payment.test.ts # 테스트 케이스
```

## 개발 서버 실행 (파일 감시 모드)

```tsx
tsx watch src/payment/payment.test.ts
```

## 📄 라이선스

MIT License  
Copyright (c) 2025 DAIBOOM

---

**문의**: [이슈 트래커](https://github.com/daiboom/fp-solid/issues)  
**위키**: [프로젝트 문서](https://github.com/daiboom/fp-solid/wiki)
