import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, ButtonGroup, Modal, Row, Col, Alert, Card } from 'react-bootstrap';
import { PlusCircleFill, PencilFill, TrashFill, ChatDots } from 'react-bootstrap-icons';
import { customersService, salesService } from '../firebase/firestore';

// Helper Functions
const formatCurrency = (value) => Math.floor(value || 0).toLocaleString();
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

// 문자 발송 함수
const sendSMS = (phoneNumber) => {
  const cleanNumber = phoneNumber.replace(/-/g, '');
  
  // 모바일 환경 감지
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // iOS와 Android에서 문자 앱 실행
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `sms:${cleanNumber}`;
    } else if (/Android/i.test(navigator.userAgent)) {
      // Android에서는 여러 방법 시도
      try {
        window.location.href = `sms:${cleanNumber}`;
      } catch (e) {
        window.location.href = `smsto:${cleanNumber}`;
      }
    } else {
      window.location.href = `sms:${cleanNumber}`;
    }
  } else {
    // 데스크톱에서는 여러 방법들을 순서대로 시도
    const protocols = [
      `sms:${cleanNumber}`,
      `smsto:${cleanNumber}`,
      `mms:${cleanNumber}`,
      `ms-chat:?ContactID=${cleanNumber}`
    ];
    
    // 첫 번째 프로토콜 시도
    window.location.href = protocols[0];
    
    // 잠시 후 다른 방법들도 시도
    setTimeout(() => {
      if (confirm(`문자 앱이 열리지 않았나요? 다른 방법을 시도하시겠습니까?\n전화번호: ${phoneNumber}`)) {
        // 사용자가 수동으로 복사할 수 있도록 전화번호를 클립보드에 복사
        navigator.clipboard.writeText(cleanNumber).then(() => {
          alert('전화번호가 클립보드에 복사되었습니다. 문자 앱에서 붙여넣기 해주세요.');
        }).catch(() => {
          alert(`전화번호: ${cleanNumber}\n수동으로 복사하여 문자 앱에 붙여넣기 해주세요.`);
        });
      }
    }, 2000);
  }
};

// Customer Add/Edit Modal Component
const CustomerModal = ({ show, onHide, onSave, customer }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cards, setCards] = useState([{ cardNumber: '', cardCompany: '', expiryDate: '', passwordHint: '' }]);
  const [carrier, setCarrier] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pwHint, setPwHint] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone);
      setGender(customer.gender || '');
      setBankName(customer.bankName || '');
      setAccountNumber(customer.accountNumber || '');
      // 기존 고객의 카드 정보를 새로운 형식으로 변환
      if (customer.cards && Array.isArray(customer.cards)) {
        setCards(customer.cards);
      } else if (customer.cardNumber) {
        setCards([{
          cardNumber: customer.cardNumber || '',
          cardCompany: customer.cardCompany || '',
          expiryDate: customer.expiryDate || '',
          passwordHint: customer.passwordHint || ''
        }]);
      } else {
        setCards([{ cardNumber: '', cardCompany: '', expiryDate: '', passwordHint: '' }]);
      }
      setCarrier(customer.carrier || '');
      setBirthdate(customer.birthdate || '');
      setPwHint(customer.pw_hint || '');
      setMemo(customer.memo || '');
    } else {
      setName('');
      setPhone('');
      setGender('');
      setBankName('');
      setAccountNumber('');
      setCards([{ cardNumber: '', cardCompany: '', expiryDate: '', passwordHint: '' }]);
      setCarrier('');
      setBirthdate('');
      setPwHint('');
      setMemo('');
    }
  }, [customer]);

  const addCard = () => {
    setCards([...cards, { cardNumber: '', cardCompany: '', expiryDate: '', passwordHint: '' }]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      const newCards = cards.filter((_, i) => i !== index);
      setCards(newCards);
    }
  };

  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleSave = () => {
    if (!name || !phone) {
      alert('이름과 전화번호는 필수 항목입니다.');
      return;
    }
    const validCards = cards.filter(card => card.cardNumber || card.cardCompany || card.expiryDate || card.passwordHint);
    onSave({ 
      ...customer, 
      name, 
      phone, 
      gender,
      bankName,
      accountNumber,
      cards: validCards.length > 0 ? validCards : [{ cardNumber: '', cardCompany: '', expiryDate: '', passwordHint: '' }],
      carrier, 
      birthdate, 
      pw_hint: pwHint, 
      memo 
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>{customer ? '고객 정보 수정' : '신규 고객 추가'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>성별</Form.Label>
                  <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">성별 선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>생년월일</Form.Label>
                  <Form.Control type="text" placeholder="YYMMDD" maxLength={6} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
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
          </Col>
          <Col md={6}>
            {/* 은행 계좌 정보 (단일) */}
            <h6 className="mb-3">은행 계좌 정보</h6>
            <Form.Group className="mb-3">
              <Form.Label>은행명</Form.Label>
              <Form.Control 
                type="text" 
                value={bankName} 
                onChange={(e) => setBankName(e.target.value)}
                placeholder="은행명 입력"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>계좌번호</Form.Label>
              <Form.Control 
                type="text" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호 입력"
              />
            </Form.Group>
            
            {/* 카드 정보 (복수) */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">카드 정보</h6>
              <Button variant="outline-primary" size="sm" onClick={addCard} className="icon-text">
                <PlusCircleFill /> 카드 추가
              </Button>
            </div>
            {cards.map((card, index) => (
              <Card key={index} className="mb-3 p-3" style={{backgroundColor: 'var(--background-primary)'}}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted fw-bold">카드 {index + 1}</small>
                  {cards.length > 1 && (
                    <Button variant="outline-danger" size="sm" onClick={() => removeCard(index)}>
                      <TrashFill />
                    </Button>
                  )}
                </div>
                <Form.Group className="mb-2">
                  <Form.Label className="small">카드번호</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={card.cardNumber} 
                    onChange={(e) => updateCard(index, 'cardNumber', e.target.value)}
                    placeholder="카드번호 입력"
                    size="sm"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small">카드사</Form.Label>
                  <Form.Select 
                    value={card.cardCompany} 
                    onChange={(e) => updateCard(index, 'cardCompany', e.target.value)}
                    size="sm"
                  >
                    <option value="">카드사 선택</option>
                    <option value="삼성카드">삼성카드</option>
                    <option value="현대카드">현대카드</option>
                    <option value="롯데카드">롯데카드</option>
                    <option value="신한카드">신한카드</option>
                    <option value="KB국민카드">KB국민카드</option>
                    <option value="우리카드">우리카드</option>
                    <option value="하나카드">하나카드</option>
                    <option value="농협카드">농협카드</option>
                    <option value="시티카드">시티카드</option>
                    <option value="BC카드">BC카드</option>
                  </Form.Select>
                </Form.Group>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small">유효기간</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={card.expiryDate} 
                        onChange={(e) => updateCard(index, 'expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small">비번 앞2자리</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={card.passwordHint} 
                        onChange={(e) => updateCard(index, 'passwordHint', e.target.value)}
                        placeholder="**"
                        maxLength={2}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>메모</Form.Label>
          <Form.Control as="textarea" rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} />
        </Form.Group>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firestore에서 고객 데이터 실시간 구독
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    console.log('고객 데이터 구독 시작...');
    
    const unsubscribe = customersService.subscribe(
      (customersData) => {
        console.log('고객 데이터 수신:', customersData.length, '개');
        setCustomers(customersData);
        setLoading(false);
      },
      (error) => {
        console.error('Customer data subscription error:', error);
        setError('고객 데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Firestore에서 매출 데이터 실시간 구독
  useEffect(() => {
    console.log('매출 데이터 구독 시작...');
    
    const unsubscribe = salesService.subscribe(
      (salesData) => {
        console.log('매출 데이터 수신:', salesData.length, '개');
        setSales(salesData);
      },
      (error) => {
        console.error('Sales data subscription error:', error);
        setError('매출 데이터를 불러오는데 실패했습니다.');
      }
    );

    return () => unsubscribe();
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

  const handleSaveCustomer = async (customerData) => {
    try {
      if (customerData.id) {
        // 기존 고객 수정
        await customersService.update(customerData.id, customerData);
      } else {
        // 새 고객 추가
        await customersService.add(customerData);
      }
      setShowEditModal(false);
    } catch (error) {
      console.error('고객 저장 오류:', error);
      alert('고객 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteClick = async (customerId) => {
    if (window.confirm('정말로 이 고객을 삭제하시겠습니까? 관련 매출 기록은 삭제되지 않습니다.')) {
      try {
        await customersService.delete(customerId);
      } catch (error) {
        console.error('고객 삭제 오류:', error);
        alert('고객 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleDetailsClick = (customer) => {
    setSelectedCustomer(customer);
    setDetailsMemo(customer.memo || '');
    setModalFilterType('all');
    setModalSelectedDate(new Date().toISOString().slice(0, 10));
    setShowDetailsModal(true);
  };
  
  const handleSaveMemo = async () => {
    if (!selectedCustomer) return;
    try {
      await customersService.update(selectedCustomer.id, { ...selectedCustomer, memo: detailsMemo });
      setShowMemoSaveAlert(true);
      setTimeout(() => setShowMemoSaveAlert(false), 2000);
    } catch (error) {
      console.error('메모 저장 오류:', error);
      alert('메모 저장에 실패했습니다.');
    }
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
                  <Row className="customer-info-row">
                    <Col xs={12} md={4}>
                      <p>
                        <strong>전화번호:</strong> 
                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sendSMS(customer.phone);
                          }}
                          className="text-primary text-decoration-none ms-2 d-inline-flex align-items-center"
                          style={{ cursor: 'pointer' }}
                          title="문자 보내기"
                        >
                          <ChatDots size={16} className="me-1" />
                          {customer.phone}
                        </a>
                      </p>
                    </Col>
                    <Col xs={6} md={2}><p><strong>성별:</strong> {customer.gender === 'male' ? '남성' : customer.gender === 'female' ? '여성' : '-'}</p></Col>
                    <Col xs={6} md={3}><p><strong>생년월일:</strong> {customer.birthdate || '-'}</p></Col>
                    <Col xs={12} md={3}><p><strong>통신사:</strong> {customer.carrier || '-'}</p></Col>
                  </Row>
                  <div>
                    {/* 은행 계좌 정보 */}
                    {(customer.bankName || customer.accountNumber) && (
                      <div className="mb-3">
                        <h6 className="text-primary mb-2">은행 계좌 정보</h6>
                        <Card className="customer-info-card" style={{backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-color)'}}>
                          <div className="small">
                            <Row>
                              {customer.bankName && <Col xs={12} sm={6}><span className="text-muted">은행:</span> {customer.bankName}</Col>}
                              {customer.accountNumber && <Col xs={12} sm={6}><span className="text-muted">계좌:</span> {customer.accountNumber}</Col>}
                            </Row>
                          </div>
                        </Card>
                      </div>
                    )}
                    
                    {/* 카드 정보 */}
                    <div>
                      <h6 className="text-primary mb-2">카드 정보</h6>
                      {(() => {
                        const cards = customer.cards && Array.isArray(customer.cards) 
                          ? customer.cards 
                          : customer.cardNumber 
                            ? [{ 
                                cardNumber: customer.cardNumber, 
                                cardCompany: customer.cardCompany || '', 
                                expiryDate: customer.expiryDate || '', 
                                passwordHint: customer.passwordHint || '' 
                              }]
                            : [];
                        
                        if (cards.length === 0) {
                          return <p className="text-muted small">등록된 카드 정보가 없습니다.</p>;
                        }
                        
                        return cards.map((card, index) => (
                          <Card key={index} className="customer-info-card" style={{backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-color)'}}>
                            <div className="small">
                              <strong className="text-secondary">카드 {index + 1}</strong>
                              <Row className="mt-1">
                                {card.cardNumber && <Col xs={12} sm={6}><span className="text-muted">번호:</span> {card.cardNumber}</Col>}
                                {card.cardCompany && <Col xs={12} sm={6}><span className="text-muted">카드사:</span> {card.cardCompany}</Col>}
                              </Row>
                              <Row className="mt-1">
                                {card.expiryDate && <Col xs={12} sm={6}><span className="text-muted">유효기간:</span> {card.expiryDate}</Col>}
                                {card.passwordHint && <Col xs={12} sm={6}><span className="text-muted">비번 앞2자리:</span> {card.passwordHint}</Col>}
                              </Row>
                            </div>
                          </Card>
                        ));
                      })()}
                    </div>
                  </div>
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
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              <div>
                {selectedCustomer.name} 님의 상세 정보
                <div className="mt-2">
                  <small className="text-muted">
                    전화번호: 
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        sendSMS(selectedCustomer.phone);
                      }}
                      className="text-primary text-decoration-none ms-2 d-inline-flex align-items-center"
                      title="문자 보내기"
                    >
                      <ChatDots size={14} className="me-1" />
                      {selectedCustomer.phone}
                    </a>
                  </small>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
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