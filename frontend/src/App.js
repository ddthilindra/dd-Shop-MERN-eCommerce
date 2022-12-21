import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
const App = () => {
  return (
    <>
      <Header />
      <main>
      {/* py-3 padding y axis 3 */}
        <Container className='py-3'>
          <h1>Welcome</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
