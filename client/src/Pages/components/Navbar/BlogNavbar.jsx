import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/Context'
import './BlogNavbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BlogNavbar() {

  const { user } = useContext(Context)

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar" sticky="top">
      <Container className="background">
        <Navbar.Brand className='brand'>TimeToGeek</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='brand'>
          <Nav className="me-auto">
            <Nav.Link className='brand'><Link to="/" className='link brand'>HOME</Link></Nav.Link>
            <Nav.Link className='brand'><Link to="/write" className='link brand'>WRITE</Link></Nav.Link>
          </Nav>
          <Nav>
            {user? 
            <>
            <Link to='/settings' className="link brand">
            <p className="topUsername fontSize brand">{user.username}</p>
             </Link>
             </>
            :(<div><Nav.Link><Link to="/login" className="link fontSize">LOGIN</Link></Nav.Link>
            <Nav.Link><Link to="/register" className="link fontSize">
              REGISTER
              </Link>
            </Nav.Link></div>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlogNavbar;