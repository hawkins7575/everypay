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

// Firestore 사용 가능 여부 확인
const isFirestoreAvailable = () => {
  return db !== undefined && db !== null;
};

// 매출 데이터 관련 함수들
export const salesService = {
  // 모든 매출 데이터 가져오기
  async getAll() {
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
    if (!isFirestoreAvailable()) {
      console.log('Firestore를 사용할 수 없습니다. LocalStorage를 사용합니다.');
      // LocalStorage에서 데이터 로드
      const savedSales = localStorage.getItem('sales');
      const sales = savedSales ? JSON.parse(savedSales) : [];
      callback(sales);
      // 빈 unsubscribe 함수 반환
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
          // 에러 발생시 localStorage 사용
          const savedSales = localStorage.getItem('sales');
          const sales = savedSales ? JSON.parse(savedSales) : [];
          console.log(`Fallback: localStorage에서 ${sales.length}개 매출 데이터 로드됨`);
          if (errorCallback) errorCallback(error);
          callback(sales);
          // 빈 unsubscribe 함수 반환
          return () => {};
        }
      );
    } catch (error) {
      console.error('구독 설정 오류:', error);
      // LocalStorage fallback
      const savedSales = localStorage.getItem('sales');
      const sales = savedSales ? JSON.parse(savedSales) : [];
      callback(sales);
      if (errorCallback) errorCallback(error);
      return () => {};
    }
  },

  // 새 매출 데이터 추가
  async add(saleData) {
    try {
      const docRef = await addDoc(collection(db, 'sales'), {
        ...saleData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('매출 데이터 추가 오류:', error);
      throw error;
    }
  },

  // 매출 데이터 수정
  async update(id, saleData) {
    try {
      const saleRef = doc(db, 'sales', id);
      await updateDoc(saleRef, {
        ...saleData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('매출 데이터 수정 오류:', error);
      throw error;
    }
  },

  // 매출 데이터 삭제
  async delete(id) {
    try {
      const saleRef = doc(db, 'sales', id);
      await deleteDoc(saleRef);
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
    if (!isFirestoreAvailable()) {
      console.log('Firestore를 사용할 수 없습니다. LocalStorage에서 고객 데이터 반환');
      const savedCustomers = localStorage.getItem('customers');
      return savedCustomers ? JSON.parse(savedCustomers) : [];
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
      // Fallback to localStorage
      const savedCustomers = localStorage.getItem('customers');
      return savedCustomers ? JSON.parse(savedCustomers) : [];
    }
  },

  // 실시간 고객 데이터 구독
  subscribe(callback, errorCallback) {
    if (!isFirestoreAvailable()) {
      console.log('Firestore를 사용할 수 없습니다. LocalStorage를 사용합니다.');
      const savedCustomers = localStorage.getItem('customers');
      const customers = savedCustomers ? JSON.parse(savedCustomers) : [];
      callback(customers);
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
          const savedCustomers = localStorage.getItem('customers');
          const customers = savedCustomers ? JSON.parse(savedCustomers) : [];
          console.log(`Fallback: localStorage에서 ${customers.length}개 고객 데이터 로드됨`);
          if (errorCallback) errorCallback(error);
          callback(customers);
          return () => {};
        }
      );
    } catch (error) {
      console.error('고객 구독 설정 오류:', error);
      const savedCustomers = localStorage.getItem('customers');
      const customers = savedCustomers ? JSON.parse(savedCustomers) : [];
      callback(customers);
      if (errorCallback) errorCallback(error);
      return () => {};
    }
  },

  // 새 고객 데이터 추가
  async add(customerData) {
    if (!isFirestoreAvailable()) {
      console.log('Firestore를 사용할 수 없습니다. LocalStorage에 고객 추가');
      const savedCustomers = localStorage.getItem('customers');
      const customers = savedCustomers ? JSON.parse(savedCustomers) : [];
      const newCustomer = { ...customerData, id: Date.now() };
      const updatedCustomers = [...customers, newCustomer];
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return newCustomer.id;
    }

    try {
      const docRef = await addDoc(collection(db, 'customers'), {
        ...customerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('고객 데이터 추가 오류:', error);
      // Fallback to localStorage
      const savedCustomers = localStorage.getItem('customers');
      const customers = savedCustomers ? JSON.parse(savedCustomers) : [];
      const newCustomer = { ...customerData, id: Date.now() };
      const updatedCustomers = [...customers, newCustomer];
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return newCustomer.id;
    }
  },

  // 고객 데이터 수정
  async update(id, customerData) {
    try {
      const customerRef = doc(db, 'customers', id);
      await updateDoc(customerRef, {
        ...customerData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('고객 데이터 수정 오류:', error);
      throw error;
    }
  },

  // 고객 데이터 삭제
  async delete(id) {
    try {
      const customerRef = doc(db, 'customers', id);
      await deleteDoc(customerRef);
    } catch (error) {
      console.error('고객 데이터 삭제 오류:', error);
      throw error;
    }
  }
};

// localStorage에서 Firestore로 데이터 마이그레이션 함수
export const migrateFromLocalStorage = async () => {
  try {
    console.log('LocalStorage에서 Firestore로 데이터 마이그레이션 시작...');

    // 매출 데이터 마이그레이션
    const localSales = localStorage.getItem('sales');
    if (localSales) {
      const sales = JSON.parse(localSales);
      console.log(`${sales.length}개의 매출 데이터 마이그레이션 중...`);
      
      for (const sale of sales) {
        // 기존 id 제거 (Firestore가 새로운 ID 생성)
        const { id, ...saleData } = sale;
        await salesService.add(saleData);
      }
      console.log('매출 데이터 마이그레이션 완료');
    }

    // 고객 데이터 마이그레이션
    const localCustomers = localStorage.getItem('customers');
    if (localCustomers) {
      const customers = JSON.parse(localCustomers);
      console.log(`${customers.length}개의 고객 데이터 마이그레이션 중...`);
      
      for (const customer of customers) {
        // 기존 id 제거 (Firestore가 새로운 ID 생성)
        const { id, ...customerData } = customer;
        await customersService.add(customerData);
      }
      console.log('고객 데이터 마이그레이션 완료');
    }

    console.log('모든 데이터 마이그레이션 완료!');
    return true;
  } catch (error) {
    console.error('데이터 마이그레이션 오류:', error);
    throw error;
  }
};