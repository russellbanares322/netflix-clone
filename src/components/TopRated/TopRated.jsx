import React, {useEffect, useState} from 'react'
import styles from './styles.module.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import axios from 'axios';

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  const handleFetch = () => {
    const check = localStorage.getItem('trendingMovies')

    if(check) {
      setMovies(JSON.parse(check))
    } else {
      axios.get(requests.requestTrending).then((res)=> {
        setMovies(res.data.results);
        localStorage.setItem('trendingMovies', JSON.stringify(res.data.results))
      })
    }
  }
  
  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <div className={styles.body}>
        <div className={styles.carousel}>
            <p className={styles.title}>Top Rated</p>
           <div className={styles.wrapper}>
            <Splide options={{
              perPage: 4,
              drag:"free",
              gap:3,
              pagination:false,
              breakpoints:{
                640: {
                  perPage:2,
                  gap: '2rem'
                }, 
                480: {
                  perPage: 1,
                  gap: '2rem'
                }
              }
            }}>
            {movies && movies.map((movie) => (
              <SplideSlide key={movie?.id}>
              <div className={styles.card}>
                <div className={styles.gradient}></div>
                <img className={styles.img} src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`} alt={movie?.title}/>
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
)}

export default TopRated;