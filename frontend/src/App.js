import './App.css';
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Product from './pages/Product'
import RequireAuth from './components/RequireAuth'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop';



function App() {
  return (
    <div>

      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<RequireAuth><Login /></RequireAuth>} />
          <Route path='/register' element={<RequireAuth><Register /></RequireAuth>} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
