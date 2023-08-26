import React, { useState } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';
import SignInModal from './SignInModal';
import axios from 'axios';

function TopBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };
  const handleSignInModalOpen = () => {
    setIsLoginModalOpen(false);
    setIsSignInModalOpen(true);
  };
  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignInModalClose = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignInCloseLoginOpen = () => {
    setIsSignInModalOpen(false);
    setIsLoginModalOpen(true);
  };

  

  const handleLogin = async (username,password) => {
    try {
        const response = await axios.post('https://localhost:7099/api/auth/login',{
          username:username,
          password:password
        });
        alert(response.data.message);
    } catch (error) {
        console.error('API Hatası',error);
    }
  };

  const handleSignIn = async(fullname,email,username,password) =>{
    try {
      const response = await axios.post("https://localhost:7099/api/auth/createUser",{
        username:username,
        fullname:fullname,
        email:email,
        password:password
      });
      alert(response.data.message);
    } catch (error) {
      console.error('API Hatası',error);
    }
  };

  return (
    <div className="top-bar">
      <div className="logo"><Link className='logo-link' to="/">Logo</Link></div>
      <div className="menu">
        <Link className='links' to="/products">Ürünler</Link>
        <Link className='links' to="/about">Hakkımızda</Link>
        <Link className='links' to="/contact">İletişim</Link>
        <button className="login-button" onClick={handleLoginModalOpen}>Giriş Yap</button>
      </div>
      {isLoginModalOpen && 
        (<LoginModal
          isOpen={isLoginModalOpen}
          onSignIn={handleSignInModalOpen}
          onClose={handleLoginModalClose}
          onLogin={handleLogin}
        />)}
        {isSignInModalOpen && 
        (<SignInModal
          isOpen={isSignInModalOpen}
          onSignIn={handleSignIn}
          onCloseSignIn={handleSignInCloseLoginOpen}
          onClose={handleSignInModalClose}
        />)}
      
    </div>
  );
}

export default TopBar;
