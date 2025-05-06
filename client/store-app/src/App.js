import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import React, { Suspense } from 'react';
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
import ChatbotComponent  from './components/Chatbot';
import CartPage from'./components/CartPage'
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


const LazyArts=React.lazy(()=>{import("./components/Arts")})
const LazyManger=React.lazy(()=>{import("./components/Manger")})
const LazyNav=React.lazy(()=>{import("./components/DigitalArt")})
function App() {
const navigate = useNavigate();
  return (
   <div>



  <Nav></Nav> 
  <Button label="Login"onClick={()=>{navigate('/login') }
       }/>
<Button label="SignIn"onClick={()=>{navigate('/signIn')}}/>
      <Routes>
      <Route path='/' element={<Arts></Arts> } />
      <Route path='/art' element={<Art/> } />
      <Route path='/arts' element={<Arts></Arts> } />
    <Route path='/manger' element={<Manger></Manger> } />
     <Route path='/DigitalArt' element={<DigitalArt></DigitalArt> } />
         <Route path='/Fantasy' element={<Fantasy></Fantasy> } />
      <Route path='/Figurative' element={<Figurative></Figurative> } />
      <Route path='/Nature' element={<Nature></Nature> } />
      <Route path='/AbstractArt' element={<AbstractArt></AbstractArt> } />
      <Route path='/login' element={ <LogIN props={true}/>} />
      <Route path='/signIn' element={<SigIn props={true}/> } />
      <Route path='CartPage'element={<CartPage/>}/>
      <Route path='payment'element={<Payment/>}/>
      <Route path='profile'element={<Profile visible={true}/>}/>
      </Routes>
      <ChatbotComponent></ChatbotComponent>  

</div>   
);
  
}

export default App;
