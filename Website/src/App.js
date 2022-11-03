import React from 'react';
import Banner from './main_page/Banner'
import MainProducts from './main_page/Products'
import './App.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';

import MainHeader from './main_page/Header';
import Footer from './main_page/Footer';

import LoginHeader from './login_page/Header';


const showProducts = () => {
  if (window.location.pathname === "/") {
    return <MainProducts />
  }
}
const showHeader = () => {
  if (window.location.pathname === "/") {
    return <MainHeader />
  }
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
