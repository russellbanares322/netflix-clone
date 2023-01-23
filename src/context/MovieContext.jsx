import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase-config";
import {toast} from 'react-toastify';

const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  //Loading state
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  },[])

  //Fetching of saved movies
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies)
    })
  }, [user?.email])

  //Handler for removing a movie in favorites
  const savedMoviesRef = doc(db, 'users', `${user?.email}`);

  const handleRemoveMovie = async(movie) => {
    try{
      const res = movies.filter(m => m.id !== movie?.id);
      await updateDoc(savedMoviesRef, {savedMovies: res});
      toast.success(`Successfully removed ${movie?.original_title} in favorites`)
    }catch(err) {
      toast.error(err.message)
    }
  }

  return <MovieContext.Provider value={{isLoading, handleRemoveMovie, movies}}>{children}</MovieContext.Provider>
};

export default MovieContext;
