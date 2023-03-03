import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../api/MovieApi';
import { HiStar } from 'react-icons/hi';
import MovieTrailer from './MovieTrailer';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeContent, setActiveContent] = useState('overview');

  //Active nav content
  const overview = activeContent === 'overview';
  const trailer = activeContent === 'trailer';
  const similar = activeContent === 'similar';
  const details = activeContent === 'details';

  //Conversion of movie runtime
  const movieHours = Math.floor(movieDetails?.runtime / 60);
  const movieMinutes = movieDetails?.runtime % 60;
  const movieAverage = Math.abs(movieDetails?.vote_average).toFixed(1);
  const movieCasts = movieDetails?.credits?.cast
    .map((val) => val.original_name)
    .slice(0, 4)
    .join(', ');
  const movieGenres = movieDetails?.genres?.map((val) => val.name).join(', ');

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
              <p>{movieDetails?.release_date}</p>
              <p>
                {movieHours}h {movieMinutes}min
              </p>
              <p>16+</p>
            </div>
            <div className={styles.nav}>
              <p
                className={overview && `${styles.active}`}
                onClick={() => setActiveContent('overview')}
              >
                OVERVIEW
              </p>
              <p
                className={trailer && `${styles.active}`}
                onClick={() => setActiveContent('trailer')}
              >
                TRAILER
              </p>
              <p
                className={similar && `${styles.active}`}
                onClick={() => setActiveContent('similar')}
              >
                SIMILAR
              </p>
              <p
                className={details && `${styles.active}`}
                onClick={() => setActiveContent('details')}
              >
                DETAILS
              </p>
            </div>
            <div className={styles.nav_content}>
              {overview && (
                <div>
                  <p className={styles.overview}>{movieDetails?.overview}</p>
                  <div className={styles.casts_wrapper}>
                    <p>Starring</p>
                    <p>{movieCasts}</p>
                  </div>
                  <div className={styles.createdby_wrapper}>
                    <p>Created by</p>
                    <p>asd</p>
                  </div>
                  <div className={styles.genre_wrapper}>
                    <p>Genre</p>
                    <p>{movieGenres}</p>
                  </div>
                </div>
              )}
              {trailer && <MovieTrailer />}
              <div>
                <p>Related Movies</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
