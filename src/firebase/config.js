import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase 구성 설정 (환경변수에서 가져오기)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Firebase 설정 검증
const isValidConfig = firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.appId &&
  firebaseConfig.apiKey !== 'your-api-key-here';

console.log('Firebase 설정 상태:', isValidConfig ? '유효' : '무효');
console.log('프로젝트 ID:', firebaseConfig.projectId);

let app;
let db;

try {
  if (isValidConfig) {
    // Firebase 초기화
    app = initializeApp(firebaseConfig);
    // Firestore 데이터베이스 초기화
    db = getFirestore(app);
    console.log('Firebase 초기화 성공');
  } else {
    console.warn('Firebase 설정이 유효하지 않습니다. localStorage를 사용합니다.');
  }
} catch (error) {
  console.error('Firebase 초기화 실패:', error);
}

// 개발 환경에서는 에뮬레이터 사용 (선택사항)
// if (process.env.NODE_ENV === 'development') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//   } catch (error) {
//     console.log('Firestore emulator already connected');
//   }
// }

export { db };