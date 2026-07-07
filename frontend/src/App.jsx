import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSingup from './pages/UserSingup';
import Captainlogin from './pages/Captainlogin';
import CaptainSingup from './pages/CaptainSingup';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptionHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';  
import CaptainLogout from './pages/CaptainLogout';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSingup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<CaptainSingup />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='user/logout' element={
          <UserProtectWrapper>
            <UserLogin />
          </UserProtectWrapper>
        } />
        <Route path='/caption-home' element={
          <CaptainProtectWrapper>
            <CaptionHome />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
