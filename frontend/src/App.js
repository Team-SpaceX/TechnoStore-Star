import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import ChooseView from './components/chooseView';
import ViewAdmin from './components/viewAdmin';
import ViewCustomer from './components/viewCustomer';
import CustomerListProducts from './components/customerListProducts';
import CustomerCart from './components/customerCart';

function App() {
  return (
    <Router>
    <div className="App">
    <Header />
      <Routes>
        
        <Route path='/' element={<ChooseView />}/>
        <Route path='/user' element={<ViewCustomer />}/>
        <Route path='/user/products' element={<CustomerListProducts />}/>
        <Route path='/user/cart' element={<CustomerCart />}/>

        <Route path='/admin' element={<ViewAdmin />}/>

      </Routes>
    <Footer />
    </div>
    </Router>
  );
}

export default App;
