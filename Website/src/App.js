import React from 'react';
import {user} from './main_page/Header'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import './components/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';
import './login_page/css/main.css';
import './login_page/css/util.css';


import MainProducts from './main_page/ProductComponent'
import MainHeader from './main_page/Header';
import Footer from './main_page/Footer';
import LoginHeader from './login_page/Header';
import LoginMain from './login_page/login';
import RegMain from './login_page/register'
import User from './user/BoardUser'
import Profile from './user/profile'
import Contact from './main_page/Contact';
import About from './main_page/About'
import ShoppingCart from './main_page/ShoppingCart'
import Admin from './main_page/Admin'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/"
          element={
          <>

          <MainHeader/>
          
          <MainProducts/>
          </>
        }/>

<Route path="/cart"
          element={
          <>

          <MainHeader/>
          {user !== null ?(
          <ShoppingCart/>
          ) :(
          <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
  )}

          
          </>
        }/>

    <Route path="/about"
          element={
          <>

          <MainHeader/>
          
          <About/>
          </>
        }/>

      <Route path="/contact"
          element={
          <>

          <MainHeader/>
          
          <Contact/>
          </>
        }/>
    
          <Route path="/login"
          element={
          <>
          {user == null ?(
            <>
          <LoginHeader/>
          <LoginMain/>
          </>
          ) : (
            <>
            <MainHeader/>
          
            <MainProducts/>
            </>
          )}
          </>

          
        }/>

      <Route path="/register"
          element={
          <>
          <LoginHeader/>
          <RegMain/>
          </>
          }/>
        

        <Route path="/user"
          element={
          <>
      {user !== null ?(
            <>
          <MainHeader/>
          
          <User/>
          </>
          ) : (
            <>
             <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
            </>
          )}
          
          </>
        }/>


<Route path="/admin"
          element={
          <>
      {user !== null ?(
            <>
          <MainHeader/>
          
          <Admin/>
          </>
          ) : (
            
            <>
            <MainHeader/>
            <MainProducts/>
            </>
          )}
          
          </>
        }/>
        

      <Route path="/profile"
          element={
          <>

{user !== null ?(
            <>
          <MainHeader/>
          
          <Profile/>
          </>
          ) : (
            <>
            <MainHeader/>
             <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
            </>
          )}
          </>
        }/>
        </Routes>
        </BrowserRouter>

      <Footer></Footer>
      </>
  );
}

export default App;
