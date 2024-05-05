import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Characters from './components/Characters'

function App() {
  

  return (
    <>
      <Provider store={store}>
      <Router>
          <div className='main'>
            <Characters />
          </div>
        </Router>
    </Provider>
    </>
  )
}

export default App
