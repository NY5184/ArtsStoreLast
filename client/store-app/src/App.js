import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import Arts from './components/Arts'
// import {BrowserRouter,Routes,Route} from'react-router-dom'

import { Link, Route, Routes } from 'react-router-dom'
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Nav from './components/nav'
import Art  from './components/Art'

import './index.css';
import './flags.css';        
const LazyArt=React.lazy(()=>{import("./components/Art")})
const LazyArts=React.lazy(()=>{import("./components/Arts")})
function App() {
  return (
   <div>

    
      {/* <Link to={'/Login'}>Login</Link> */}

{/*    
      <Link to={'/Art'}>artatat</Link> */}
   <Nav></Nav>
      <Routes>
      <Route path='/' element={<Art></Art> } />
      <Route path='/arts' element={<Arts></Arts> } />

      </Routes>

{/* <React.StrictMode>

    <PrimeReactProvider>
    <Arts/>
    </PrimeReactProvider>
   
</React.StrictMode> */}
</div>   
);
  
}

export default App;
