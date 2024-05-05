import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Characters from './components/Character/Characters'
import Navbar from './components/navbar/Navbar';
import Location from './components/Location/Location';

function App() {
  

  return (
    <>
      <Provider store={store}>
      <Router>
        <Navbar />
        <div className='main'>
          <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/location" element={<Location />} /> {/* Add a Route for the Location component */}
          </Routes>
          
        </div>
        </Router>
    </Provider>
    </>
  )
}

export default App
