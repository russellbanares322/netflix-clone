import React, { useContext }  from 'react';
import { HiOutlineHeart as Heart } from 'react-icons/hi';
import styles from './styles.module.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, db} from '../../config/firebase-config';
import MovieContext from '../../context/MovieContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddtoFavorites = ({movie}) => {
  const {handleRemoveMovie, movies} = useContext(MovieContext);
  const [user] = useAuthState(auth);

  //Adding movies to favorites
  const movieID = doc(db, 'users', `${user?.email}`);
  const savedMovieID = movies?.map(m => m.id);

  const handleSaveMovie = async(e) => {
    e.preventDefault();
    if(!savedMovieID?.includes(movie.id)){
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: movie?.id,
          imageUrl: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
          original_title: movie?.original_title,
          details: movie?.overview,

        })
      })
      toast.success(`Added ${movie?.original_title} to favorites`)
    } else {
      handleRemoveMovie(movie)
    }
  }
  return (
    <div>
      {user && <>
        {savedMovieID?.includes(movie?.id) ? 
       ( <Heart style={{fill:'#AF1C22', color:'white'}} className={styles.heart} size={20} onClick={handleSaveMovie}/> )
     : 
       (<Heart style={{fill:'rgba(0, 0, 0, 0.5)', color:'white'}} className={styles.heart} size={20} onClick={handleSaveMovie}/>)
      }
      </>}
    </div>
  )
}

export default AddtoFavorites