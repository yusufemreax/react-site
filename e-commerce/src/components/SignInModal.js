import React,{useState} from "react";
import './modal.css'
function SignInModal({isOpen,onCloseSignIn,onClose,onSignIn}){
    const [fullname,setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSignIn = ()=>{
        onSignIn(fullname,email,username,password);
    };
    return(
        <div className={`modal-overlay ${isOpen ? 'open':''}`}>
            <div className={`modal ${isOpen ? 'open':'closed'}`}>
                <div className='popup-header'>
                    <h2>Kayıt Ol</h2>
                    <button className='close-button' onClick={onClose}>X</button>
                </div>
                <div className='texts'>
                    <div className="input-container">
                        <input
                            type="text"
                            id="fullname"
                            className="inputText"
                            value={fullname}
                            onChange={(e)=> {setFullname(e.target.value)}}
                        />
                        <label htmlFor="fullname" className="input-label">Adı Soyadı</label>
                    </div>
                    <div className="input-container">
                        <input
                                type="email"
                                id="email"
                                className="inputText"
                                value={email}
                                onChange={(e)=> {setEmail(e.target.value)}}
                        />
                        <label htmlFor="email" className="input-label">E mail</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            id="username"
                            className="inputText"
                            value={username}
                            onChange={(e)=> {setUsername(e.target.value)}}
                        />
                        <label htmlFor="username" className="input-label">Kullanıcı Adı</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            id="password"
                            className="inputText"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                        <label htmlFor="password" className="input-label">Şifre</label>
                    </div>
                </div>
                <div className='buttons'>
                    <button className="register-button" onClick={handleSignIn}>Kayıt Ol</button>
                    <button className="register-button" onClick={onCloseSignIn}>Giriş Yap</button>
                </div>
            </div>
        </div>
    );
}

export default SignInModal;