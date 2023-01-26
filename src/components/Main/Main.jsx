import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import requests from '../../Requests';
import styles from './styles.module.css';
 
const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)]

  const handleFetchMovies = () => {
    const check = localStorage.getItem('movie')
    if(check) {
      setMovies(JSON.parse(check))
    } else {
      axios.get(requests.requestPopular).then((res) => {
        setMovies(res.data.results)
        localStorage.setItem('movie', JSON.stringify(res.data.results))
      })
    }
  }

  useEffect(() => {
    handleFetchMovies()
  }, [])
  return (
    <div className={styles.main}>
      <div className={styles.movie_wrapper}>
      <div className={styles.gradient}></div>
        <Image fluid className={styles.img} src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}/>
        <div className={styles.gradient}></div>
        <div className={styles.details}>
          <p className={styles.title}>{movie?.title}</p>
            <div className={styles.btns_wrapper}>
              <button className={styles.play}>Play</button>
              <button className={styles.later}>Watch Later</button>
            </div>
          <p className={styles.date}>Released: {movie?.release_date}</p>
          <p className={styles.overview}>{movie?.overview.substring(0,120)}...</p>
        </div>
      </div>
    </div>
  )
}

export default Main;