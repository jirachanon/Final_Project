import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SendBP from './components/SendBP.jsx';
import { Provider } from 'react-redux'
import store from './store.js';

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/SendBP/:param1" element={<SendBP />} />
            <Route path="/Home/:param1" element={<Home />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )

}

export default App
