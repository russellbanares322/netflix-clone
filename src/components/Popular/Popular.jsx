import api from '../../api/MovieApi';
import React, { useEffect, useState } from 'react';
import requests from '../../Requests';
import styles from './styles.module.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AddtoFavorites from '../AddToFavorites/AddtoFavorites';
import { useNavigate } from 'react-router-dom';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleFetch = () => {
    const check = localStorage.getItem('popularMovies');

    if (check) {
      setMovies(JSON.parse(check));
    } else {
      api.get(requests.requestPopular).then((res) => {
        setMovies(res.data.results);
        localStorage.setItem('popularMovies', JSON.stringify(res.data.results));
      });
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div className={styles.body}>
      <div className={styles.carousel}>
        <p className={styles.title}>Popular</p>
        <div className={styles.wrapper}>
          <Splide
            options={{
              perPage: 4,
              gap: 3,
              drag: 'free',
              pagination: false,
              breakpoints: {
                640: {
                  perPage: 2,
                  gap: '1rem',
                },
                480: {
                  perPage: 1,
                  gap: '1rem',
                },
                300: {
                  perPage: 1,
                  gap: '1rem',
                },
              },
            }}
          >
            {movies &&
              movies.map((movie) => (
                <SplideSlide key={movie?.id}>
                  <div className={styles.card}>
                    <img
                      className={styles.img}
                      src={`https://image.tmdb.org/t/p/w500/${
                        movie?.backdrop_path || movie?.poster_path
                      }`}
                      alt={movie?.title}
                    />
                    <AddtoFavorites movie={movie} />
                    <div
                      className={styles.movie_title_wrapper}
                      onClick={() => navigate(`/movie-details/${movie?.id}`)}
                    >
                      <p className={styles.movie_title}>{movie?.title}</p>
                    </div>
                  </div>
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Popular;
