import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, ListGroup, Alert, ButtonGroup } from 'react-bootstrap';
import { Calendar3, Plus, Clock, PencilSquare, Trash, CalendarDay, CalendarWeek, Calendar2Month } from 'react-bootstrap-icons';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';

function Marketing() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState('day'); // 'day', 'week', 'month'
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    description: '',
    type: 'meeting',
    isAllDay: false
  });

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const schedulesCollection = collection(db, 'schedules');
        const q = query(schedulesCollection, orderBy('date'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const schedulesData = [];
          snapshot.forEach((doc) => {
            schedulesData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setSchedules(schedulesData);
          setLoading(false);
        }, (error) => {
          console.error('스케줄 데이터 로드 실패:', error);
          setError('데이터를 불러오는데 실패했습니다.');
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Firebase 연결 실패:', error);
        setError('데이터베이스 연결에 실패했습니다.');
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingSchedule) {
        // 기존 일정 수정
        const scheduleRef = doc(db, 'schedules', editingSchedule.id);
        await updateDoc(scheduleRef, {
          ...formData,
          date: selectedDate,
          updatedAt: new Date()
        });
      } else {
        // 새 일정 추가
        await addDoc(collection(db, 'schedules'), {
          ...formData,
          date: selectedDate,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      setShowModal(false);
      setFormData({ title: '', time: '', description: '', type: 'meeting', isAllDay: false });
      setEditingSchedule(null);
    } catch (error) {
      console.error('일정 저장 실패:', error);
      setError('일정 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      title: schedule.title,
      time: schedule.time,
      description: schedule.description,
      type: schedule.type,
      isAllDay: schedule.isAllDay || false
    });
    setSelectedDate(schedule.date);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('일정을 삭제하시겠습니까?')) {
        await deleteDoc(doc(db, 'schedules', id));
      }
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      setError('일정 삭제에 실패했습니다.');
    }
  };

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules
      .filter(schedule => schedule.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getSchedulesByDate = (date) => {
    return schedules
      .filter(schedule => schedule.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getWeekRange = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // 월요일 시작
    const monday = new Date(currentDate.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return {
      start: monday.toISOString().split('T')[0],
      end: sunday.toISOString().split('T')[0]
    };
  };

  const getMonthRange = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    return {
      start: firstDay.toISOString().split('T')[0],
      end: lastDay.toISOString().split('T')[0]
    };
  };

  const getSchedulesByView = () => {
    switch (viewType) {
      case 'day':
        return getSchedulesByDate(selectedDate);
      
      case 'week':
        const weekRange = getWeekRange(selectedDate);
        return schedules
          .filter(schedule => 
            schedule.date >= weekRange.start && schedule.date <= weekRange.end
          )
          .sort((a, b) => {
            if (a.date === b.date) {
              return a.time.localeCompare(b.time);
            }
            return a.date.localeCompare(b.date);
          });
      
      case 'month':
        const monthRange = getMonthRange(selectedDate);
        return schedules
          .filter(schedule => 
            schedule.date >= monthRange.start && schedule.date <= monthRange.end
          )
          .sort((a, b) => {
            if (a.date === b.date) {
              return a.time.localeCompare(b.time);
            }
            return a.date.localeCompare(b.date);
          });
      
      default:
        return [];
    }
  };

  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getViewTitle = () => {
    const date = new Date(selectedDate);
    switch (viewType) {
      case 'day':
        return `${date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} (${date.toLocaleDateString('ko-KR', { weekday: 'short' })})`;
      
      case 'week':
        const weekRange = getWeekRange(selectedDate);
        const startDate = new Date(weekRange.start);
        const endDate = new Date(weekRange.end);
        return `${startDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}`;
      
      case 'month':
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
      
      default:
        return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'meeting': return 'primary';
      case 'task': return 'success';
      case 'call': return 'warning';
      case 'event': return 'info';
      default: return 'secondary';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'meeting': return '미팅';
      case 'task': return '업무';
      case 'call': return '통화';
      case 'event': return '이벤트';
      default: return '기타';
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">데이터를 불러오는 중...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Calendar3 className="me-2" size={24} />
          <h1 className="mb-0">스케줄</h1>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)} disabled={loading}>
          <Plus className="me-2" />
          일정 추가
        </Button>
      </div>

      <Row>
        {/* 오늘 일정 */}
        <Col lg={6} className="mb-4">
          <Card className="card-custom">
            <Card.Header>
              <strong>오늘 일정</strong>
              <Badge bg="info" className="ms-2">
                {getTodaySchedules().length}
              </Badge>
            </Card.Header>
            <Card.Body>
              {getTodaySchedules().length > 0 ? (
                <ListGroup variant="flush">
                  {getTodaySchedules().map((schedule) => (
                    <ListGroup.Item key={schedule.id} className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <Badge bg={getTypeColor(schedule.type)} className="me-2">
                            {getTypeText(schedule.type)}
                          </Badge>
                          <Clock size={14} className="me-1 text-muted" />
                          <small className="text-muted">{schedule.isAllDay ? '종일' : schedule.time}</small>
                        </div>
                        <h6 className="mb-1">{schedule.title}</h6>
                        <p className="mb-0 text-muted small">{schedule.description}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(schedule)}>
                          <PencilSquare size={14} />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(schedule.id)}>
                          <Trash size={14} />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <Calendar3 size={48} className="text-muted mb-3" />
                  <p className="text-muted">오늘 예정된 일정이 없습니다.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* 날짜별 일정 */}
        <Col lg={6}>
          <Card className="card-custom">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>일정 보기</strong>
              <ButtonGroup size="sm">
                <Button 
                  variant={viewType === 'day' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewType('day')}
                >
                  <CalendarDay size={16} className="me-1" />
                  일
                </Button>
                <Button 
                  variant={viewType === 'week' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewType('week')}
                >
                  <CalendarWeek size={16} className="me-1" />
                  주
                </Button>
                <Button 
                  variant={viewType === 'month' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewType('month')}
                >
                  <Calendar2Month size={16} className="me-1" />
                  월
                </Button>
              </ButtonGroup>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>날짜 선택</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Form.Text className="text-muted">
                  {getViewTitle()}
                </Form.Text>
              </Form.Group>
              
              {getSchedulesByView().length > 0 ? (
                <ListGroup variant="flush">
                  {getSchedulesByView().map((schedule) => (
                    <ListGroup.Item key={schedule.id} className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <Badge bg={getTypeColor(schedule.type)} className="me-2">
                            {getTypeText(schedule.type)}
                          </Badge>
                          <Clock size={14} className="me-1 text-muted" />
                          <small className="text-muted">{schedule.isAllDay ? '종일' : schedule.time}</small>
                          {viewType !== 'day' && (
                            <Badge bg="light" text="dark" className="ms-2">
                              {formatDateDisplay(schedule.date)}
                            </Badge>
                          )}
                        </div>
                        <h6 className="mb-1">{schedule.title}</h6>
                        <p className="mb-0 text-muted small">{schedule.description}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(schedule)}>
                          <PencilSquare size={14} />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(schedule.id)}>
                          <Trash size={14} />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <Calendar3 size={48} className="text-muted mb-3" />
                  <p className="text-muted">
                    {viewType === 'day' && '선택한 날짜에 일정이 없습니다.'}
                    {viewType === 'week' && '이번 주에 일정이 없습니다.'}
                    {viewType === 'month' && '이번 달에 일정이 없습니다.'}
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 일정 추가/편집 모달 */}
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setFormData({ title: '', time: '', description: '', type: 'meeting', isAllDay: false });
        setEditingSchedule(null);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSchedule ? '일정 수정' : '일정 추가'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>날짜</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="일정 제목을 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>시간</Form.Label>
              <div className="mb-2">
                <Form.Check
                  type="checkbox"
                  id="allDay"
                  name="isAllDay"
                  label="종일"
                  checked={formData.isAllDay}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isAllDay: e.target.checked,
                      time: e.target.checked ? '' : prev.time
                    }));
                  }}
                />
              </div>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                disabled={formData.isAllDay}
                required={!formData.isAllDay}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>유형</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="meeting">미팅</option>
                <option value="task">업무</option>
                <option value="call">통화</option>
                <option value="event">이벤트</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>설명</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="일정에 대한 설명을 입력하세요"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowModal(false);
              setFormData({ title: '', time: '', description: '', type: 'meeting', isAllDay: false });
              setEditingSchedule(null);
            }}>
              취소
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? '처리중...' : (editingSchedule ? '수정' : '추가')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Marketing;
