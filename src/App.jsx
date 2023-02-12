import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';
import MovieContext from './context/MovieContext';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
// import Projects from './Projects';

function App() {
  const { isLoading } = useContext(MovieContext);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* <Route path="/projects" element={<Projects />}/> */}
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
