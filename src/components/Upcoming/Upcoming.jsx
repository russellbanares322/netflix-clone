import axios from 'axios';
import React, { useEffect, useState } from 'react'
import requests from '../../Requests';
import styles from './styles.module.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AddtoFavorites from '../AddToFavorites/AddtoFavorites';

const Upcoming = () => {
  const [movies, setMovies] = useState([]);

  const handleFetchMovies =() => {
   const check = localStorage.getItem('upcommingMovies')

    if(check) {
      setMovies(JSON.parse(check))
    } else {
      axios.get(requests.requestUpcoming).then((res)=> {
        setMovies(res.data.results)
        localStorage.setItem('upcommingMovies', JSON.stringify(res.data.results));
      })
    }
    console.log(check)
  }

  useEffect(() => {
    handleFetchMovies()
  }, [])
  return (
    <div className={styles.body}>
        <div className={styles.carousel}>
            <p className={styles.title}>Upcoming</p>
           <div className={styles.wrapper}>
            <Splide options={{
              perPage: 4,
              drag:"free",
              gap:3,
              pagination:false,
              breakpoints:{
                640: {
                  perPage:2,
                  gap: '1rem'
                }, 
                480: {
                  perPage: 1,
                  gap: '1rem'
                }, 300: {
                  perPage:1,
                  gap:'1rem'
                }
              }
            }}>
            {movies && movies.map((movie) => (
              <SplideSlide key={movie?.id}>
              <div className={styles.card}>
                <div className={styles.gradient}></div>
                <img className={styles.img} src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`} alt={movie?.title}/>
                <AddtoFavorites />
                <div className={styles.movie_title_wrapper}>
                <p className={styles.movie_title}>{movie?.title}</p>
                </div>
              </div>
              </SplideSlide>
              ))}
              </Splide>
           </div>
        </div>
    </div>
  )
}

export default Upcoming;