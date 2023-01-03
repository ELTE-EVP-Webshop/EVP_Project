import React from 'react';
import {user} from './main_page/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/bootstrap.min.css';
import './css/headerstyle.css';
import './css/footerstyle.css';
import './css/profile.css';
import './fonts/icomoon/style.css';
import './css/productsstyle.css';
import './login_page/css/main.css';
import './login_page/css/util.css';
import './css/contact.css';
import './css/cartstyle.css';
import './css/admin.css';
import './css/payment.css';
import './css/forget.css';
import AuthService from './services/AuthService';



import MainProducts from './main_page/ProductComponent';
import MainHeader from './main_page/Header';
import MergedHeader from './main_page/HeaderProduct';
import Footer from './main_page/Footer';
import Error404 from './error_page/404error';
import ForgotPass from './login_page/forgetPassword';
import NewPassword from './login_page/newPassword';
import MobileMenu from './MobileMenu';
import LoginHeader from './login_page/Header';
import LoginMain from './login_page/login';

import ProfileHeader from './user/Header'
import User from './user/BoardUser'
import Profile from './user/profile'

import Admin from './admin_page/Admin'

import Contact from './contact_page/Contact';
import ContactHeader from './contact_page/Header';

import RegMain from './login_page/register'

import ShoppingCart from './cart/ShoppingCart'
import ShoppingHeader from './cart/Header'

import Payment from './payment/Payment'
import PaymentHeader from './payment/Header'
import Login from './login_page/login';
import Orders from './user/Orders';
function App() {
   

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/"
          element={
            
          <>

          
          {user == null ? (
            <>
            <MobileMenu/>
          <MainProducts/>
          <Footer/>
            </>
          ):(
            <>
            <MobileMenu/>
          <MainProducts/>
          <Footer/>
          </>
          )}
          </>
        }/>

<Route path="/cart"
          element={
          <>

          <MobileMenu/>
          <ShoppingHeader/>
          {user !== null ?(
            <>
          <ShoppingCart/>
          <Footer/>
         </>
          ) :(
            <>
          <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
          <Footer/>
          </>
  )}

          
          </>
        }/>
           <Route path="/payment"
          element={
          <>

          <MobileMenu/>
          <PaymentHeader/>
          
          <Payment/>
          <Footer/>
          </>
        }/>

    

      <Route path="/contact"
          element={
          <>
          <MobileMenu/>
          <ContactHeader/>
          
          <Contact/>
          <Footer/>
          </>
        }/>
    
          <Route path="/login"
          element={
          <>
          {user == null ?(
            <>
          <MobileMenu/>
          <LoginHeader/>
          <LoginMain/>
          <Footer/>
          </>
          ) : (
            <>
            <MobileMenu/>
            
          
            <MainProducts/>
            <Footer/>
            </>
          )}
          </>

          
        }/>
        <Route path="/orders"
          element={
          <>
          {user != null ?(
            <>
          <MobileMenu/>
        <MainHeader/>
            <Orders/>
          <Footer/>
          </>
          ) : (
            <>
            <MobileMenu/>
            
          
            <MainProducts/>
            <Footer/>
            </>
          )}
          </>

          
        }/>
        <Route path="/TermsOfService"
          element={
          <>
          <div>n+1. szabály: Szemet szeméremért</div>
          </>
          }/>

      <Route path="/register"
          element={
          <>
          <MobileMenu/>
          <LoginHeader/>
          <RegMain/>
          <Footer/>
          </>
          }/>
        

        <Route path="/user"
          element={
          <>
      {user !== null ?(
            <>
          <MobileMenu/>
          <MainHeader/>
          
          <User/>
          <Footer/>
          </>
          ) : (
            <>
             <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
             <Footer/>
            </>
          )}
          
          </>
        }/>
 <Route path="/mailConfirmSuccess"
          element={
          <>
 
          <h1>Az email címe sikeresen megerősítve!</h1>
          </>

          }
/>
<Route path="/mailConfirmFailed"
          element={
          <>

<h1>Hiba lépett fel az email cím megerősítése során!</h1>
          </>

          }
/>
<Route path="/forgetPassword"
          element={
        <>
<LoginHeader/>
<ForgotPass/>
</>
          

          }
        />

<Route path="/newPassword"
          element={
        <>
<LoginHeader/>
<NewPassword/>
</>
          

          }
        />

<Route path="/admin"
          element={
          <>
      {user !== null ?(
            <>
          <MobileMenu/>
          <ContactHeader/>
          
          <Admin/>
          <Footer/>
          </>
          ) : (
            
            <>
            <MobileMenu/>
            <MergedHeader/>
            <Footer/>
            </>
          )}
          
          </>
        }/>
<Route path="/*"  element={<Error404/>} />

      <Route path="/profile"
          element={
          <>

{user !== null ?(
            <>
          <MobileMenu/>
          <ProfileHeader/>
          
          <Profile/>
          <Footer/>
          </>
          ) : (
            <>
            
            <MobileMenu/>
            <ProfileHeader/>
             <h1 className='text-center pt-3'>Nincs jogosítványod, hogy elérd ezt az oldalt!</h1>
             <Footer/>
            </>
          )}
          </>
        }/>
        </Routes>
        </BrowserRouter>

      
      </>
  );
}

export default App;
