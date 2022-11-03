import React from 'react';
import Banner from './components/Banner'
import Products from './components/Products'
import './App.css';
<<<<<<< HEAD
=======

>>>>>>> 360b4bd67f85adf3f589251a539b333d1694fb93
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';

<<<<<<< HEAD
import Header from './components/Header';

import Footer from './components/Footer';
=======
import Header from './main_page/Header';
import Banner from './main_page/Banner';
import ChoiceBoxes from './main_page/ChoiceBoxes';
import Products from './main_page/Products';
import Discount from './main_page/Discount';
import Footer from './main_page/Footer';
>>>>>>> 360b4bd67f85adf3f589251a539b333d1694fb93


const showBanner = () => {
  if (window.location.pathname === "/products") {
    return <Products />
  }
}

function App() {
  return (
    <>
<<<<<<< HEAD
    <Header></Header>
    {showBanner()}

=======
      <Header></Header>
      {/*<Banner></Banner>
      <ChoiceBoxes></ChoiceBoxes>*/}
      <Products></Products>
      {/*<Discount></Discount>*/}
>>>>>>> 360b4bd67f85adf3f589251a539b333d1694fb93
      <Footer></Footer>
      </>
  );
}

export default App;
