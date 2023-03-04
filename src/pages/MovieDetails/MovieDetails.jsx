import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../api/MovieApi';
import { HiStar } from 'react-icons/hi';
import MovieTrailer from './MovieTrailer';
import { motion } from 'framer-motion';
import RecommendedMovies from './RecommendedMovies';
import AddtoFavorites from '../../components/AddToFavorites/AddtoFavorites';
import MovieContext from '../../context/MovieContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeContent, setActiveContent] = useState('overview');

  //Verification if the movie is already saved from favorites
  const savedMovieID = movies?.map((m) => m.id);
  const isAlreadySaved = savedMovieID?.includes(movieDetails?.id);

  //Active nav content
  const overview = activeContent === 'overview';
  const trailer = activeContent === 'trailer';

  //Conversion of movie runtime
  const movieHours = Math.floor(movieDetails?.runtime / 60);
  const movieMinutes = movieDetails?.runtime % 60;
  const movieAverage = Math.abs(movieDetails?.vote_average).toFixed(1);
  const movieCasts = movieDetails?.credits?.cast
    .map((val) => val.original_name)
    .slice(0, 4)
    .join(', ');
  const movieGenres = movieDetails?.genres?.map((val) => val.name).join(', ');
  const movieReleaseDate = movieDetails?.release_date?.slice(0, 4);

  //Fetching of movie details
  const handleFetchMovieDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/movie/${id}?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=en-US&append_to_response=credits`
      );
      setMovieDetails(response.data);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    id && handleFetchMovieDetails();
  }, [id]);

  return (
    <div className={styles.movie_details_body}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.movie_wrapper}>
          <div className={styles.left}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
            />
            <div className={styles.gradient}></div>
          </div>
          <div className={styles.right}>
            <p className={styles.favorites_btn}>
              {isAlreadySaved ? 'Remove from Favorites' : 'Add to Favorites'}
              <AddtoFavorites movie={movieDetails} />
            </p>
            <div className={styles.header_title}>
              <p className={styles.original_title}>
                {movieDetails?.original_title}
              </p>
              <p className={styles.vote_average}>
                {movieAverage}
                <HiStar className={styles.star_icon} />
              </p>
            </div>
            <div className={styles.date_wrapper}>
              <p>{movieReleaseDate}</p>
              <p>
                {movieHours}h {movieMinutes}min
              </p>
            </div>
            <div className={styles.nav}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <p
                  className={overview && `${styles.active}`}
                  onClick={() => setActiveContent('overview')}
                >
                  OVERVIEW
                </p>
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <p
                  className={trailer && `${styles.active}`}
                  onClick={() => setActiveContent('trailer')}
                >
                  TRAILER
                </p>
              </motion.div>
            </div>
            <div className={styles.nav_content}>
              {overview && (
                <motion.div
                  key="details"
                  initial={{ x: '50%', opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  exit={{ x: '50%', opacity: 0 }}
                >
                  <p className={styles.overview}>{movieDetails?.overview}</p>
                  <div className={styles.casts_wrapper}>
                    <p>Casts</p>
                    <p>{movieCasts}</p>
                  </div>
                  <div className={styles.createdby_wrapper}>
                    <p>Status</p>
                    <p>{movieDetails?.status}</p>
                  </div>
                  <div className={styles.genre_wrapper}>
                    <p>Genre</p>
                    <p>{movieGenres}</p>
                  </div>
                </motion.div>
              )}
              {trailer && (
                <motion.div
                  key="trailer"
                  initial={{ x: '50%', opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  exit={{ x: '50%', opacity: 0 }}
                >
                  <MovieTrailer />
                </motion.div>
              )}
              <div className={styles.recommended_wrapper}>
                <p>Recommended</p>
                <RecommendedMovies />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
