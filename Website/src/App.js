import './App.css';

import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';

import Header from './components/Header';
import Banner from './components/Banner';
import ChoiceBoxes from './components/ChoiceBoxes';
import Products from './components/Products';
import Discount from './components/Discount';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header></Header>
      {/*<Banner></Banner>
      <ChoiceBoxes></ChoiceBoxes>
      <Products></Products>
      <Discount></Discount>*/}
      <Footer></Footer>
      </>
  );
}

export default App;
