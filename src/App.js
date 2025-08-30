import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';
import BottomNavigationBar from './components/BottomNavigationBar'; // Import BottomNavigationBar
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Soccer from './pages/Soccer';
import Marketing from './pages/Marketing';
import './App.css'; // Import custom CSS

function App() {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Container className="py-3">
            <Routes>
              <Route path="/" element={<Sales />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/soccer" element={<Soccer />} />
              <Route path="/marketing" element={<Marketing />} />
            </Routes>
          </Container>
        </main>
        <BottomNavigationBar />
      </div>
    </Router>
  );
}

export default App;