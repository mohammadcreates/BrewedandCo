import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';



function App() {
  return (
    <BrowserRouter basename="/BrewedandCo>
      <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
      <Footer />
      </CartProvider> 
    </BrowserRouter>
  );
}

export default App;
