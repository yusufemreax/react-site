import React,{useState} from 'react';
import './modal.css'
function LoginModal({isOpen,onClose,onLogin,onSignIn}) {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const handleLogin = () => {
        onLogin(username,password);
    };


  return (
    
    <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`}>
        <div className={`modal ${isOpen ? 'open':'closed'}`}>
            <div className='popup-header'>
                <h2>Giriş Yap</h2>
                <button className='close-button' onClick={onClose}>X</button>
            </div>
            <div className='texts'>
                <div className="input-container">
                    <input 
                        type='text' 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username" className="input-label">Kullanıcı Adı</label>
                </div>
                <div className="input-container">
                    <input 
                        type='password' 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className="input-label">Şifre</label>
                </div>
            </div>
            <div className='buttons'>
                <button className="register-button" onClick={onSignIn}>Kayıt Ol</button>
                <button className="register-button" onClick={handleLogin}>Giriş Yap</button>
            </div>
        </div>
    </div>

  );
}

export default LoginModal;