import React from 'react'
import "./App.css"
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch" 
import Login from './pages/login/Login';
import Register from "./pages/register/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from "./authContext/AuthContext"
import Account from './pages/account/Account';
import MyList from './pages/myList/MyList';


const App = () => {
  const {user} = useContext(AuthContext) 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/register"/> } />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        {user && (
          <>
        <Route path="/movies" element={<Home type = "movies" />} />
        <Route path="/series" element={<Home type = "series" />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/account" element={<Account />} />
        <Route path="/my-list" element={<MyList />} />



        </>
        )}
      </Routes>
    </Router>
  )
}

export default App
