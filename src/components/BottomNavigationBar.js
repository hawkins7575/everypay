import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { HouseFill, PeopleFill, Trophy, Calendar3 } from 'react-bootstrap-icons';
import './BottomNavigationBar.css';

const BottomNavigationBar = () => {
  return (
    <Navbar fixed="bottom" className="bottom-nav d-lg-none">
      <Nav className="w-100 justify-content-around">
        <LinkContainer to="/sales">
          <Nav.Link className="text-center">
            <HouseFill size={20} />
            <div>판매</div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/customers">
          <Nav.Link className="text-center">
            <PeopleFill size={20} />
            <div>고객</div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/soccer">
          <Nav.Link className="text-center">
            <Trophy size={20} />
            <div>축구</div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/marketing">
          <Nav.Link className="text-center">
            <Calendar3 size={20} />
            <div>스케줄</div>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default BottomNavigationBar;