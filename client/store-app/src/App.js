import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
// import './styles.css'

import Arts from './components/Arts'
import Manger from './components/Manger'
import DigitalArt from './components/DigitalArt'
import Fantasy from './components/Fantasy'
import Figurative from './components/Figurative'
import Nature from './components/Nature'
import AbstractArt from './components/AbstractArt'
import ChatbotComponent from './components/Chatbot';

import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Nav from './components/nav'


import './index.css';
import './flags.css';
import LogIN from './components/LogIn';
import SigIn from './components/SignIn';
import { Button } from 'primereact/button';
import Art from './components/Art';
import Payment from './components/Payment';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import CartPage from './components/CartPage';


const LazyArts = React.lazy(() => { import("./components/Arts") })
const LazyManger = React.lazy(() => { import("./components/Manger") })
const LazyNav = React.lazy(() => { import("./components/DigitalArt") })
function App() {
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [profileVisible, setProfileVisible] = useState(true);

  const handleProfileHide = () => {
      setProfileVisible(false); // Closes the dialog by updating the state
  };

  return (
    <div>



      <Nav></Nav>
      <div className="button-container">
        <Button label="Login" onClick={() => { navigate('/login') }} />
        <Button label="SignIn" onClick={() => { navigate('/signIn') }} />
      </div>
      <Routes>
        <Route path='/' element={<Arts/>} />
        <Route path='/art' element={<Art />} />
        <Route path='/arts' element={<Arts/>} />
        <Route path='/manager' element={<Manger/>} />
        <Route path='/DigitalArt' element={<DigitalArt/>} />
        <Route path='/Fantasy' element={<Fantasy/>} />
        <Route path='/Figurative' element={<Figurative/>} />
        <Route path='/Nature' element={<Nature></Nature>} />
        <Route path='/AbstractArt' element={<AbstractArt/>} />
        <Route path='/login' element={<LogIN props={true} />} />
        <Route path='/signIn' element={<SigIn props={true} />} />
        <Route path='CartPage' element={<CartPage />} />
        <Route path='payment' element={<Payment />} />
        <Route path='profile' element={<Profile  visible={true} onHide={handleProfileHide} />} />
      </Routes>
      <ChatbotComponent></ChatbotComponent>

    </div>
  );

}

export default App;
