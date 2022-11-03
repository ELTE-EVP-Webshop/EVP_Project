import React from 'react';
import Banner from './main_page/Banner'
import Products from './main_page/Products'
import './App.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';

import Header from './main_page/Header';

import Footer from './main_page/Footer';


const showBanner = () => {
  if (window.location.pathname === "/products") {
    return <Products />
  }
}

function App() {
  return (
    <>
    <Header></Header>
    {showBanner()}

      <Footer></Footer>
      </>
  );
}

export default App;
