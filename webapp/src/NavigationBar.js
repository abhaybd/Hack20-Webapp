import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import Logo from "./maphusky2.png";


const Styles = styled.div`
    .navbar {background-color: #4b2e83;}
    a, .navbar-nav, .navbar-light .nav-link {
    color: #b7a57a;
    // margin-right: 5px;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #b7a57a;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/"><b>DAWG MAPS</b></Navbar.Brand>
      <Navbar.Brand href="/">
      <img
        alt=""
        src={Logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/"><b>Home</b></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/about"><b>About</b></Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)