import React, { useState,useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth'
import Index from './home/Index'

function App() {
  const [sessionToken,setSessionToken]=useState('');
  const api_key='5ae2e3f221c38a28845f05b60282c4994410542a110ccc5c7ff90aa1';
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  },[])

  const updateToken=(newToken)=>{
    localStorage.setItem('token',newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  const clearToken=()=>{
    localStorage.clear();
    setSessionToken("");

  }

  const protectedViews=()=>{
    return (sessionToken===localStorage.getItem('token')?<Index token={sessionToken} api_key={api_key}/>:<Auth updateToken={updateToken}/>)
  }
  return (
    <div >
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
