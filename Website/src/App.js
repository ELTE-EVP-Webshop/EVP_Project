import './App.css';

import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';

import Header from './main_page/Header';
import Banner from './main_page/Banner';
import ChoiceBoxes from './main_page/ChoiceBoxes';
import Products from './main_page/Products';
import Discount from './main_page/Discount';
import Footer from './main_page/Footer';

function App() {
  return (
    <>
      <Header></Header>
      {/*<Banner></Banner>
      <ChoiceBoxes></ChoiceBoxes>*/}
      <Products></Products>
      {/*<Discount></Discount>*/}
      <Footer></Footer>
      </>
  );
}

export default App;
