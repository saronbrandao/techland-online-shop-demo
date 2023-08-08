import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 d-flex gap-2">
            <div className="footer-info">
              <p>TechLand &copy; {currentYear}</p>
              <p>
                This project is part of{' '}
                <a href="http://www.sarondev.com" target="blank">
                  sarondev.com
                </a>{' '}
                Portfolio
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
