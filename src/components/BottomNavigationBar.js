import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { HouseFill, PeopleFill, GraphUp } from 'react-bootstrap-icons';
import './BottomNavigationBar.css';

const BottomNavigationBar = () => {
  return (
    <Navbar fixed="bottom" className="bottom-nav d-lg-none">
      <Nav className="w-100 justify-content-around">
        <LinkContainer to="/sales">
          <Nav.Link className="text-center">
            <HouseFill size={24} />
            <div>판매</div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/customers">
          <Nav.Link className="text-center">
            <PeopleFill size={24} />
            <div>고객</div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/marketing">
          <Nav.Link className="text-center">
            <GraphUp size={24} />
            <div>분석</div>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default BottomNavigationBar;