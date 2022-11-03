import React from 'react';
import Banner from './components/Banner'
import Products from './components/Products'
import './App.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';

import Header from './components/Header';

import Footer from './components/Footer';


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
