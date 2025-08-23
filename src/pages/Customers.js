import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, ButtonGroup, Modal, Row, Col, Alert, Card } from 'react-bootstrap';
import { PlusCircleFill, PencilFill, TrashFill } from 'react-bootstrap-icons';

// Helper Functions
const formatCurrency = (value) => Math.floor(value || 0).toLocaleString();
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

// Customer Add/Edit Modal Component
const CustomerModal = ({ show, onHide, onSave, customer }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pwHint, setPwHint] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone);
      setCardNumber(customer.cardNumber || '');
      setBankName(customer.bankName || '');
      setAccountNumber(customer.accountNumber || '');
      setCarrier(customer.carrier || '');
      setBirthdate(customer.birthdate || '');
      setPwHint(customer.pw_hint || '');
      setMemo(customer.memo || '');
    } else {
      setName('');
      setPhone('');
      setCardNumber('');
      setBankName('');
      setAccountNumber('');
      setCarrier('');
      setBirthdate('');
      setPwHint('');
      setMemo('');
    }
  }, [customer]);

  const handleSave = () => {
    if (!name || !phone) {
      alert('이름과 전화번호는 필수 항목입니다.');
      return;
    }
    onSave({ ...customer, name, phone, cardNumber, bankName, accountNumber, carrier, birthdate, pw_hint: pwHint, memo });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>{customer ? '고객 정보 수정' : '신규 고객 추가'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3"><Form.Label>이름</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>전화번호</Form.Label><Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>생년월일</Form.Label><Form.Control type="text" placeholder="YYMMDD" maxLength={6} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>통신사</Form.Label>
              <Form.Select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
                <option value="">통신사를 선택하세요</option>
                <option value="SKT">SKT</option>
                <option value="KT">KT</option>
                <option value="LG U+">LG U+</option>
                <option value="SKT 알뜰폰">SKT 알뜰폰</option>
                <option value="KT 알뜰폰">KT 알뜰폰</option>
                <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>비밀번호 앞 2자리</Form.Label><Form.Control type="text" value={pwHint} onChange={(e) => setPwHint(e.target.value)} maxLength={2} /></Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3"><Form.Label>카드번호</Form.Label><Form.Control type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>은행명</Form.Label><Form.Control type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>은행계좌</Form.Label><Form.Control type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /></Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3"><Form.Label>메모</Form.Label><Form.Control as="textarea" rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} /></Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>취소</Button>
        <Button variant="primary" onClick={handleSave}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [customersWithSales, setCustomersWithSales] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [detailsMemo, setDetailsMemo] = useState('');
  const [showMemoSaveAlert, setShowMemoSaveAlert] = useState(false);
  const [modalFilterType, setModalFilterType] = useState('all');
  const [modalSelectedDate, setModalSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [modalFilteredSales, setModalFilteredSales] = useState([]);

  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    const savedSales = localStorage.getItem('sales');
    if (savedSales) setSales(JSON.parse(savedSales));
  }, []);

  useEffect(() => {
    const combinedData = customers.map(customer => {
      const customerSales = sales.filter(sale => sale.phone === customer.phone);
      const totalSales = customerSales.reduce((total, sale) => total + sale.amount, 0);
      return { ...customer, totalSales, sales: customerSales };
    }).sort((a, b) => a.name.localeCompare(b.name));
    setCustomersWithSales(combinedData);
  }, [customers, sales]);

  useEffect(() => {
    if (!selectedCustomer) return;
    let result = selectedCustomer.sales;
    const filterDate = new Date(modalSelectedDate);
    switch (modalFilterType) {
      case 'day': result = selectedCustomer.sales.filter(sale => sale.date === modalSelectedDate); break;
      case 'week':
        const startOfWeek = getStartOfWeek(filterDate);
        const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(startOfWeek.getDate() + 6);
        result = selectedCustomer.sales.filter(s => { const d = new Date(s.date); return d >= startOfWeek && d <= endOfWeek; });
        break;
      case 'month':
        result = selectedCustomer.sales.filter(s => { const d = new Date(s.date); return d.getFullYear() === filterDate.getFullYear() && d.getMonth() === filterDate.getMonth(); });
        break;
      default: result = selectedCustomer.sales; break;
    }
    setModalFilteredSales(result);
  }, [selectedCustomer, modalFilterType, modalSelectedDate]);

  const handleSaveCustomer = (customerData) => {
    let updatedCustomers;
    if (customerData.id) {
      updatedCustomers = customers.map(c => c.id === customerData.id ? { ...c, ...customerData } : c);
    } else {
      updatedCustomers = [...customers, { ...customerData, id: Date.now() }];
    }
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setShowEditModal(false);
  };

  const handleDeleteClick = (customerId) => {
    if (window.confirm('정말로 이 고객을 삭제하시겠습니까? 관련 매출 기록은 삭제되지 않습니다.')) {
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }
  };

  const handleDetailsClick = (customer) => {
    setSelectedCustomer(customer);
    setDetailsMemo(customer.memo || '');
    setModalFilterType('all');
    setModalSelectedDate(new Date().toISOString().slice(0, 10));
    setShowDetailsModal(true);
  };
  
  const handleSaveMemo = () => {
    if (!selectedCustomer) return;
    const updatedCustomers = customers.map(c => c.id === selectedCustomer.id ? { ...c, memo: detailsMemo } : c);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setShowMemoSaveAlert(true);
    setTimeout(() => setShowMemoSaveAlert(false), 2000);
  };

  const modalTotalAmount = modalFilteredSales.reduce((total, sale) => total + sale.amount, 0);
  const modalTotalCommission = modalFilteredSales.reduce((total, sale) => total + sale.commission, 0);
  const modalTotalRemittance = modalFilteredSales.reduce((total, sale) => total + sale.remittance, 0);
  const modalTotalProfit = modalFilteredSales.reduce((total, sale) => total + sale.profit, 0);
  const modalTotalBonus = modalFilteredSales.reduce((total, sale) => total + (sale.bonus || 0), 0);

  return (
    <Container className="mt-4">
      <Card className="card-custom">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col><h2>고객 목록</h2></Col>
            <Col className="text-end"><Button onClick={() => { setEditingCustomer(null); setShowEditModal(true); }} className="icon-text"><PlusCircleFill /> 신규 고객 추가</Button></Col>
          </Row>
          
          <div className="customer-list">
            {customersWithSales.map((customer, index) => (
              <Card key={customer.id} className="mb-3 customer-card">
                <Card.Header onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
                  <Row className="align-items-center">
                    <Col>
                      <strong className="customer-name">{customer.name}</strong>
                    </Col>
                    <Col className="text-end">
                      <ButtonGroup size="sm">
                        <Button variant="outline-secondary" onClick={(e) => { e.stopPropagation(); setEditingCustomer(customer); setShowEditModal(true); }}><PencilFill /></Button>
                        <Button variant="outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(customer.id); }}><TrashFill /></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
                  <Row>
                    <Col xs={12} md={6}><p><strong>전화번호:</strong> {customer.phone}</p></Col>
                    <Col xs={12} md={6}><p><strong>생년월일:</strong> {customer.birthdate}</p></Col>
                    <Col xs={12} md={6}><p><strong>통신사:</strong> {customer.carrier}</p></Col>
                    <Col xs={12} md={6}><p><strong>카드번호:</strong> {customer.cardNumber}</p></Col>
                    <Col xs={12} md={6}><p><strong>은행명:</strong> {customer.bankName}</p></Col>
                    <Col xs={12} md={6}><p><strong>은행계좌:</strong> {customer.accountNumber}</p></Col>
                  </Row>
                </Card.Body>
                <Card.Footer onClick={() => handleDetailsClick(customer)} style={{ cursor: 'pointer' }}>
                  <strong>총 매출액: {formatCurrency(customer.totalSales)} 원</strong>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>

      <CustomerModal show={showEditModal} onHide={() => setShowEditModal(false)} onSave={handleSaveCustomer} customer={editingCustomer} />

      {selectedCustomer && (
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="xl">
          <Modal.Header closeButton className="modal-header-custom"><Modal.Title>{selectedCustomer.name} 님의 상세 정보</Modal.Title></Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <h5>거래 기록</h5>
                <Form className="mb-3">
                  <Row className="align-items-end">
                    <Col md={6}><Form.Group controlId="modalFilterDate"><Form.Label>날짜 선택</Form.Label><Form.Control type="date" value={modalSelectedDate} onChange={(e) => setModalSelectedDate(e.target.value)} /></Form.Group></Col>
                    <Col md={6}><Form.Group controlId="modalFilterType"><Form.Label>검색 단위</Form.Label><Form.Select value={modalFilterType} onChange={(e) => setModalFilterType(e.target.value)}><option value="all">전체</option><option value="day">일별</option><option value="week">주별</option><option value="month">월별</option></Form.Select></Form.Group></Col>
                  </Row>
                </Form>
                {modalFilteredSales.length > 0 ? (
                  <Table striped bordered hover responsive size="sm">
                    <thead className="table-header-custom"><tr><th>날짜</th><th>결제금액</th><th>수수료</th><th>송금액</th><th>수익</th><th>보너스</th></tr></thead>
                    <tbody>
                      {modalFilteredSales.map(sale => (
                        <tr key={sale.id}><td>{sale.date}</td><td>{formatCurrency(sale.amount)} 원</td><td>{formatCurrency(sale.commission)} 원</td><td>{formatCurrency(sale.remittance)} 원</td><td>{formatCurrency(sale.profit)} 원</td><td>{formatCurrency(sale.bonus)} 원</td></tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr><td className="text-end"><strong>총계</strong></td><td><strong>{formatCurrency(modalTotalAmount)} 원</strong></td><td><strong>{formatCurrency(modalTotalCommission)} 원</strong></td><td><strong>{formatCurrency(modalTotalRemittance)} 원</strong></td><td><strong>{formatCurrency(modalTotalProfit)} 원</strong></td><td><strong>{formatCurrency(modalTotalBonus)} 원</strong></td></tr>
                    </tfoot>
                  </Table>
                ) : (<p>선택된 기간에 이 고객의 거래 기록이 없습니다.</p>)}
              </Col>
              <Col md={4} className="border-start">
                <h5>메모</h5>
                <Form.Group controlId="detailsMemo">
                  <Form.Control as="textarea" rows={10} value={detailsMemo} onChange={(e) => setDetailsMemo(e.target.value)} placeholder="고객에 대한 특징이나 메모를 남겨보세요."/>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {showMemoSaveAlert && <Alert variant="success" className="me-auto p-2">메모가 저장되었습니다!</Alert>}
            <Button variant="primary" onClick={handleSaveMemo}>메모 저장</Button>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>닫기</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Customers;