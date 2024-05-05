import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Home from './components/Home/Home'
import Navbar from './components/navbar/Navbar';
import Location from './components/Location/Location';
import Profile from './components/Profile/Profile';
import Episode from './components/Episode/Episode';
import Footer from './components/Footer/Footer';

function App() {
  

  return (
    <>
      <Provider store={store}>
      <Router>
        <Navbar />
        <div className='main'>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/episode" element={<Episode />} />
          </Routes>
        </div>
        <Footer />
        </Router>
    </Provider>
    </>
  )
}

export default App
