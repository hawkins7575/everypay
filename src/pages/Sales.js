import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Row, Col, Modal, ButtonGroup, Card } from 'react-bootstrap';
import { PlusCircleFill, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { salesService, customersService } from '../firebase/firestore';

// Helper functions
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};
const formatCurrency = (value) => Math.floor(value || 0).toLocaleString();

// Constants
const COMMISSION_RATE = 0.066;
const REMITTANCE_RATE = 0.901;
const PROFIT_RATE = 1 - COMMISSION_RATE - REMITTANCE_RATE;
const BONUS_RATE = 0.009;
const PER_TRANSACTION_COMMISSION = 330;

// Sale Edit/Add Modal Component
const SaleModal = ({ show, onHide, onSave, sale }) => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (sale) {
      setDate(sale.date);
      setName(sale.name);
      setPhone(sale.phone);
      setAmount(sale.amount);
    } else {
      setDate(new Date().toISOString().slice(0, 10));
      setName('');
      setPhone('');
      setAmount('');
    }
  }, [sale]);

  const handleSave = () => {
    if (!name || !phone || !amount) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    const saleAmount = parseFloat(amount);
    onSave({
      ...sale,
      date, name, phone, amount: saleAmount,
      commission: saleAmount * COMMISSION_RATE,
      remittance: saleAmount * REMITTANCE_RATE,
      profit: saleAmount * PROFIT_RATE - PER_TRANSACTION_COMMISSION,
      bonus: saleAmount * BONUS_RATE,
      perTransactionCommission: PER_TRANSACTION_COMMISSION
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>{sale ? '매출 수정' : '신규 매출 기록'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3"><Form.Label>날짜</Form.Label><Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>이름</Form.Label><Form.Control type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>전화번호</Form.Label><Form.Control type="tel" placeholder="전화번호를 입력하세요" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Form.Group>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>결제금액</Form.Label><Form.Control type="number" placeholder="결제금액" value={amount} onChange={(e) => setAmount(e.target.value)} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>수수료 (6.6%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * COMMISSION_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>송금액 (90.1%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * REMITTANCE_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>수익 (3.3%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * PROFIT_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>보너스 (0.9%)</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={amount ? formatCurrency(parseFloat(amount) * BONUS_RATE) + ' 원' : '0.00 원'} /></Form.Group></Col>
        </Row>
        <Row>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>건당수수료</Form.Label><Form.Control type="text" readOnly style={{ color: 'red' }} value={formatCurrency(PER_TRANSACTION_COMMISSION) + ' 원'} /></Form.Group></Col>
            <Col md={8}><Form.Group className="mb-3"><Form.Label>최종 수익</Form.Label><Form.Control type="text" readOnly style={{ color: 'blue' }} value={amount ? formatCurrency(parseFloat(amount) * PROFIT_RATE - PER_TRANSACTION_COMMISSION) + ' 원' : '0.00 원'} /></Form.Group></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>취소</Button>
        <Button variant="primary" onClick={handleSave}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

function Sales() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Firestore에서 매출 데이터 실시간 구독
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    console.log('매출 데이터 구독 시작...');
    
    // 실시간 구독 설정
    const unsubscribe = salesService.subscribe(
      (salesData) => {
        console.log('매출 데이터 수신:', salesData.length, '개');
        setSales(salesData);
        setLoading(false);
      },
      (error) => {
        console.error('Sales data subscription error:', error);
        setError('Firestore 연결에 실패했습니다. 로컬 데이터를 사용합니다.');
        setLoading(false);
      }
    );

    // 타임아웃 설정 - 5초 후에도 로딩 중이면 localStorage 사용
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('Firestore 연결 타임아웃, localStorage 사용');
        setLoading(false);
        setError('Firestore 연결 시간이 초과되었습니다. 로컬 데이터를 사용합니다.');
        const savedSales = localStorage.getItem('sales');
        if (savedSales) {
          setSales(JSON.parse(savedSales));
        }
      }
    }, 5000);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let result = sales;
    const filterDate = new Date(selectedDate);
    switch (filterType) {
      case 'day': result = sales.filter(s => s.date === selectedDate); break;
      case 'week':
        const startOfWeek = getStartOfWeek(filterDate);
        const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(startOfWeek.getDate() + 6);
        result = sales.filter(s => { const d = new Date(s.date); return d >= startOfWeek && d <= endOfWeek; });
        break;
      case 'month':
        result = sales.filter(s => { const d = new Date(s.date); return d.getFullYear() === filterDate.getFullYear() && d.getMonth() === filterDate.getMonth(); });
        break;
      default: result = sales; break;
    }
    setFilteredSales(result);
  }, [sales, filterType, selectedDate]);

  const handleSaveSale = async (saleData) => {
    try {
      if (saleData.id) {
        // 기존 매출 수정
        await salesService.update(saleData.id, saleData);
      } else {
        // 새 매출 추가
        await salesService.add(saleData);
        
        // 새로운 고객이면 고객 목록에도 추가
        try {
          // 먼저 Firestore에서 기존 고객 확인
          const existingCustomers = await customersService.getAll();
          const existingCustomer = existingCustomers.find(c => c.phone === saleData.phone);
          
          if (!existingCustomer) {
            const newCustomer = { 
              name: saleData.name, 
              phone: saleData.phone, 
              gender: '',
              bankName: '', 
              accountNumber: '', 
              cards: [{ cardNumber: '', cardCompany: '' }],
              carrier: '', 
              birthdate: '', 
              pw_hint: '', 
              memo: '' 
            };
            await customersService.add(newCustomer);
            console.log('새 고객 자동 등록:', saleData.name, saleData.phone);
          }
        } catch (error) {
          console.error('고객 자동 등록 오류:', error);
          // Fallback: localStorage에 저장
          const savedCustomers = localStorage.getItem('customers') || '[]';
          const customers = JSON.parse(savedCustomers);
          if (!customers.some(c => c.phone === saleData.phone)) {
            const newCustomer = { 
              name: saleData.name, 
              phone: saleData.phone, 
              gender: '',
              bankName: '', 
              accountNumber: '', 
              cards: [{ cardNumber: '', cardCompany: '' }],
              carrier: '', 
              birthdate: '', 
              pw_hint: '', 
              memo: '' 
            };
            localStorage.setItem('customers', JSON.stringify([...customers, { ...newCustomer, id: Date.now() }]));
          }
        }
      }
      setShowModal(false);
      setEditingSale(null);
    } catch (error) {
      console.error('매출 저장 오류:', error);
      alert('매출 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm('정말로 이 매출 기록을 삭제하시겠습니까?')) {
      try {
        await salesService.delete(saleId);
      } catch (error) {
        console.error('매출 삭제 오류:', error);
        alert('매출 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const totalAmount = filteredSales.reduce((total, sale) => total + sale.amount, 0);
  const totalCommission = filteredSales.reduce((total, sale) => total + sale.commission, 0);
  const totalRemittance = filteredSales.reduce((total, sale) => total + sale.remittance, 0);
  const totalProfit = filteredSales.reduce((total, sale) => total + sale.profit, 0);
  const totalBonus = filteredSales.reduce((total, sale) => total + (sale.bonus || 0), 0);
  const totalPerTransactionCommission = filteredSales.reduce((total, sale) => total + (sale.perTransactionCommission || 0), 0);

  const isMobile = windowWidth < 768;

  return (
    <Container className="mt-4">
      <Card className="card-custom">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col><h2>매출리스트</h2></Col>
            <Col className="text-end"><Button onClick={() => { setEditingSale(null); setShowModal(true); }} className="icon-text"><PlusCircleFill /> 신규 매출 기록</Button></Col>
          </Row>
          <Form className="mb-3 p-3 border rounded">
            <Row className="align-items-end">
              <Col md={4}><Form.Group controlId="filterDate"><Form.Label>날짜 선택</Form.Label><Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></Form.Group></Col>
              <Col md={4}><Form.Group controlId="filterType"><Form.Label>검색 단위</Form.Label><Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}><option value="all">전체</option><option value="day">일별</option><option value="week">주별</option><option value="month">월별</option></Form.Select></Form.Group></Col>
            </Row>
          </Form>

          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">로딩 중...</span>
              </div>
              <p className="mt-2">데이터를 불러오는 중입니다...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-warning" role="alert">
              <strong>알림:</strong> {error} 로컬 데이터를 사용합니다.
            </div>
          )}

          {!loading && (isMobile ? (
            <>
              {filteredSales.map((sale, index) => (
                <Card key={sale.id} className="mobile-card">
                  <Card.Body>
                    <div className="mobile-card-row"><span className="mobile-card-label">날짜:</span> <span className="mobile-card-value">{sale.date}</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">이름:</span> <span className="mobile-card-value">{sale.name}</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">전화번호:</span> <span className="mobile-card-value">{sale.phone}</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">결제금액:</span> <span className="mobile-card-value">{formatCurrency(sale.amount)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">수수료:</span> <span className="mobile-card-value">{formatCurrency(sale.commission)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">송금액:</span> <span className="mobile-card-value">{formatCurrency(sale.remittance)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">최종수익:</span> <span className="mobile-card-value">{formatCurrency(sale.profit)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">건당수수료:</span> <span className="mobile-card-value">{formatCurrency(sale.perTransactionCommission)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">보너스:</span> <span className="mobile-card-value">{formatCurrency(sale.bonus)} 원</span></div>
                    <div className="d-flex justify-content-end mt-2">
                      <ButtonGroup size="sm">
                        <Button variant="outline-secondary" onClick={() => { setEditingSale(sale); setShowModal(true); }} className="icon-text"><PencilFill /></Button>
                        <Button variant="outline-danger" onClick={() => handleDeleteSale(sale.id)} className="icon-text"><TrashFill /></Button>
                      </ButtonGroup>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              {filteredSales.length > 0 && (
                <Card className="mobile-totals-card">
                  <Card.Body>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 결제금액:</span> <span className="mobile-card-value">{formatCurrency(totalAmount)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 수수료:</span> <span className="mobile-card-value">{formatCurrency(totalCommission)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 송금액:</span> <span className="mobile-card-value">{formatCurrency(totalRemittance)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 최종수익:</span> <span className="mobile-card-value">{formatCurrency(totalProfit)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 건당수수료:</span> <span className="mobile-card-value">{formatCurrency(totalPerTransactionCommission)} 원</span></div>
                    <div className="mobile-card-row"><span className="mobile-card-label">총 보너스:</span> <span className="mobile-card-value">{formatCurrency(totalBonus)} 원</span></div>
                  </Card.Body>
                </Card>
              )}
            </>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-header-custom">
                <tr><th>#</th><th>날짜</th><th>이름</th><th>전화번호</th><th>결제금액</th><th>수수료</th><th>송금액</th><th>최종수익</th><th>건당수수료</th><th>보너스</th><th>관리</th></tr>
              </thead>
              <tbody>
                {filteredSales.map((sale, index) => (
                  <tr key={sale.id}>
                    <td>{index + 1}</td><td>{sale.date}</td><td>{sale.name}</td><td>{sale.phone}</td><td>{formatCurrency(sale.amount)} 원</td><td>{formatCurrency(sale.commission)} 원</td><td>{formatCurrency(sale.remittance)} 원</td><td>{formatCurrency(sale.profit)} 원</td><td>{formatCurrency(sale.perTransactionCommission)} 원</td><td>{formatCurrency(sale.bonus)} 원</td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant="outline-secondary" onClick={() => { setEditingSale(sale); setShowModal(true); }} className="icon-text"><PencilFill /></Button>
                        <Button variant="outline-danger" onClick={() => handleDeleteSale(sale.id)} className="icon-text"><TrashFill /></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end"><strong>총계</strong></td><td><strong>{formatCurrency(totalAmount)} 원</strong></td><td><strong>{formatCurrency(totalCommission)} 원</strong></td><td><strong>{formatCurrency(totalRemittance)} 원</strong></td><td><strong>{formatCurrency(totalProfit)} 원</strong></td><td><strong>{formatCurrency(totalPerTransactionCommission)} 원</strong></td><td><strong>{formatCurrency(totalBonus)} 원</strong></td><td></td>
                </tr>
              </tfoot>
            </Table>
          ))}
        </Card.Body>
      </Card>
      <SaleModal show={showModal} onHide={() => setShowModal(false)} onSave={handleSaveSale} sale={editingSale} />
    </Container>
  );
}

export default Sales;