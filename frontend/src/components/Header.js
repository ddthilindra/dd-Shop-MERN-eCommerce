import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#'>dd-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              // ml-auto allign the menu item to left
              className='ml-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href='#cart'><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              <Nav.Link href='#login'><i className='fas fa-user'></i>Signin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
