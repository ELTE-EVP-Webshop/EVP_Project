import React from 'react';
import Banner from './main_page/Banner'
import MainProducts from './main_page/Products'
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


const showProducts = () => {
  if (window.location.pathname === "/") {
    return <MainProducts />
  }else
  if (window.location.pathname === "/login") {
    return <LoginMain />
  }
}
const showHeader = () => {
  if (window.location.pathname === "/") {
    return <MainHeader />
  }else
  if (window.location.pathname === "/login") {
    return <LoginHeader />
  }
}

function App() {
  return (
    <>
    {showHeader()}
    {showProducts()}

      <Footer></Footer>
      </>
  );
}

export default App;
