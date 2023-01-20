import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { MovieProvider } from './context/MovieContext'
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Projects from './Projects';


function App() {

  return (
    <div className="App">
      <MovieProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/projects" element={<Projects />}/>
        </Routes>
      </MovieProvider>
     
    </div>
  )
}

export default App
