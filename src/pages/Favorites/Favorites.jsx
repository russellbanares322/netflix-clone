import React, { useContext } from 'react';
import MovieContext from '../../context/MovieContext';
import styles from './styles.module.css';
import { HiOutlineHeart as Heart } from 'react-icons/hi';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { movies, handleRemoveMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <p className={styles.main_title}>My Shows</p>
        <div className={styles.gradient}></div>
        <div className={styles.gradient2}></div>
      </div>
      <div className={styles.favorites_wrapper}>
        <p className={styles.title}>
          You currrently have {movies?.length} saved shows
        </p>
        <div className={styles.card_wrapper}>
          {movies?.map((movie) => (
            <div className={styles.card} key={movie?.id}>
              <img
                className={styles.movie_image}
                onClick={() => navigate(`/movie-details/${movie?.id}`)}
                src={movie?.imageUrl}
                alt={movie?.original_title}
              />
              <Heart
                style={{ fill: '#AF1C22', color: 'white' }}
                className={styles.heart}
                size={23}
                onClick={() => handleRemoveMovie(movie)}
              />
              <p className={styles.movie_title}>{movie?.original_title}</p>
              <p className={styles.movie_details}>
                {ReactHtmlParser(movie?.details.split('.')[0])}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
