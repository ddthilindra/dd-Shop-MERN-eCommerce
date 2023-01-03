import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        {/* py-3 padding y axis 3 */}
        <Container className='py-3'>
          <Routes>
            <Route path='/' element={<HomeScreen/>}  />
            <Route path='/product/:id' element={<ProductScreen/>}  />
            <Route path='/cart/:id?' element={<CartScreen/>}  />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
