import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main>
      {/* py-3 padding y axis 3 */}
        <Container className='py-3'>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
