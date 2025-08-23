import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot,
  orderBy,
  query,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// 매출 데이터 관련 함수들
export const salesService = {
  // 모든 매출 데이터 가져오기
  async getAll() {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const salesQuery = query(collection(db, 'sales'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(salesQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('매출 데이터 조회 오류:', error);
      throw error;
    }
  },

  // 실시간 매출 데이터 구독
  subscribe(callback, errorCallback) {
    if (!db) {
      const error = new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
      console.error(error);
      if (errorCallback) errorCallback(error);
      return () => {};
    }

    try {
      const salesQuery = query(collection(db, 'sales'), orderBy('date', 'desc'));
      return onSnapshot(salesQuery, 
        (snapshot) => {
          const sales = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log(`Firestore에서 ${sales.length}개 매출 데이터 로드됨`);
          callback(sales);
        }, 
        (error) => {
          console.error('매출 데이터 실시간 구독 오류:', error);
          if (errorCallback) errorCallback(error);
        }
      );
    } catch (error) {
      console.error('구독 설정 오류:', error);
      if (errorCallback) errorCallback(error);
      return () => {};
    }
  },

  // 새 매출 데이터 추가
  async add(saleData) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const docRef = await addDoc(collection(db, 'sales'), {
        ...saleData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('매출 데이터 추가 성공:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('매출 데이터 추가 오류:', error);
      throw error;
    }
  },

  // 매출 데이터 수정
  async update(id, saleData) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const saleRef = doc(db, 'sales', id);
      await updateDoc(saleRef, {
        ...saleData,
        updatedAt: serverTimestamp()
      });
      console.log('매출 데이터 수정 성공:', id);
    } catch (error) {
      console.error('매출 데이터 수정 오류:', error);
      throw error;
    }
  },

  // 매출 데이터 삭제
  async delete(id) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const saleRef = doc(db, 'sales', id);
      await deleteDoc(saleRef);
      console.log('매출 데이터 삭제 성공:', id);
    } catch (error) {
      console.error('매출 데이터 삭제 오류:', error);
      throw error;
    }
  }
};

// 고객 데이터 관련 함수들
export const customersService = {
  // 모든 고객 데이터 가져오기
  async getAll() {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }

    try {
      const customersQuery = query(collection(db, 'customers'), orderBy('name'));
      const querySnapshot = await getDocs(customersQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('고객 데이터 조회 오류:', error);
      throw error;
    }
  },

  // 실시간 고객 데이터 구독
  subscribe(callback, errorCallback) {
    if (!db) {
      const error = new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
      console.error(error);
      if (errorCallback) errorCallback(error);
      return () => {};
    }

    try {
      const customersQuery = query(collection(db, 'customers'), orderBy('name'));
      return onSnapshot(customersQuery, 
        (snapshot) => {
          const customers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log(`Firestore에서 ${customers.length}개 고객 데이터 로드됨`);
          callback(customers);
        }, 
        (error) => {
          console.error('고객 데이터 실시간 구독 오류:', error);
          if (errorCallback) errorCallback(error);
        }
      );
    } catch (error) {
      console.error('고객 구독 설정 오류:', error);
      if (errorCallback) errorCallback(error);
      return () => {};
    }
  },

  // 새 고객 데이터 추가
  async add(customerData) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }

    try {
      const docRef = await addDoc(collection(db, 'customers'), {
        ...customerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('고객 데이터 추가 성공:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('고객 데이터 추가 오류:', error);
      throw error;
    }
  },

  // 고객 데이터 수정
  async update(id, customerData) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const customerRef = doc(db, 'customers', id);
      await updateDoc(customerRef, {
        ...customerData,
        updatedAt: serverTimestamp()
      });
      console.log('고객 데이터 수정 성공:', id);
    } catch (error) {
      console.error('고객 데이터 수정 오류:', error);
      throw error;
    }
  },

  // 고객 데이터 삭제
  async delete(id) {
    if (!db) {
      throw new Error('Firebase가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
    }
    
    try {
      const customerRef = doc(db, 'customers', id);
      await deleteDoc(customerRef);
      console.log('고객 데이터 삭제 성공:', id);
    } catch (error) {
      console.error('고객 데이터 삭제 오류:', error);
      throw error;
    }
  }
};

