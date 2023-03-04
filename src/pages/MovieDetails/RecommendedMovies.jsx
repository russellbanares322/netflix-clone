import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/MovieApi';
import styles from './styles.module.css';
import AddtoFavorites from '../../components/AddToFavorites/AddtoFavorites';

const RecommendedMovies = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFetchRecommendedMovies = () => {
    const check = localStorage.getItem('recommendedMovies');
    if (check) {
      setRecommendedMovies(JSON.parse(check));
    } else {
      api
        .get(
          `/movie/${id}/recommendations?api_key=${
            import.meta.env.VITE_REACT_APP_API_KEY
          }&language=en-US`
        )
        .then((res) => {
          setRecommendedMovies(res.data.results);
          localStorage.setItem(
            'recommendedMovies',
            JSON.stringify(res.data.results)
          );
        });
    }
  };

  useEffect(() => {
    id && handleFetchRecommendedMovies();
  }, [id]);
  return (
    <div className={styles.wrapper}>
      <Splide
        options={{
          perPage: 3,
          drag: 'free',
          gap: 3,
          pagination: false,
          breakpoints: {
            640: {
              perPage: 1,
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
        {recommendedMovies &&
          recommendedMovies.map((movie) => (
            <SplideSlide key={movie?.id}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src={`https://image.tmdb.org/t/p/w500/${
                    movie?.backdrop_path || movie?.poster_path
                  }`}
                  alt={movie?.title}
                />
                <div className="heart_icon">
                  <AddtoFavorites movie={movie} />
                </div>
                <div
                  className={styles.movie_title_wrapper}
                  onClick={() => {
                    navigate(`/movie-details/${movie?.id}`);
                    window.scroll(0, 0);
                  }}
                >
                  <p className={styles.movie_title}>{movie?.title}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
      </Splide>
      <div className={styles.gradient}></div>
    </div>
  );
};

export default RecommendedMovies;
