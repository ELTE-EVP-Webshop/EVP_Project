import React from 'react';
//import MainProducts from './main_page/ProductComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';
import './login_page/css/main.css';
import './login_page/css/util.css';


import MainHeader from './main_page/Header';
import Footer from './main_page/Footer';

import LoginHeader from './login_page/Header';
import LoginMain from './login_page/login';






function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/"
          element={
          <>
          <MainHeader/>
          
          </>
        }/>
    
          <Route path="/login"
          element={
          <>
          <LoginHeader/>
          <LoginMain/>
          </>
        }/>
        </Routes>
        </BrowserRouter>

      <Footer></Footer>
      </>
  );
}

export default App;
