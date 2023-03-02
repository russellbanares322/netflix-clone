import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import YouTube from 'react-youtube';
import api from '../../api/MovieApi';
import { HiStar } from 'react-icons/hi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const movieHours = Math.floor(movieDetails?.runtime / 60);
  const movieMinutes = movieDetails?.runtime % 60;
  const movieAverage = Math.abs(movieDetails?.vote_average).toFixed(1);
  const movieCasts = movieDetails?.credits?.cast
    .map((val) => val.original_name)
    .slice(0, 4)
    .join(', ');

  const handleFetchMovieTrailer = async () => {
    try {
      const check = localStorage.getItem('selectedMovie');
      if (check) {
        setMovieDetails(JSON.parse(check));
      } else {
        const response = await api.get(
          `/movie/${id}/videos?api_key=${
            import.meta.env.VITE_REACT_APP_API_KEY
          }&language=pt-BR&include_video_language=en`
        );
        const filteredResponse = response.data.results.filter(
          (val) => val.name.toUpperCase() === 'OFFICIAL TRAILER'
        );
        setMovieTrailer(filteredResponse);
        localStorage.setItem(JSON.stringify(filteredResponse));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFetchMovieDetails = async () => {
    setIsLoading(true);
    await api
      .get(
        `/movie/${id}?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=en-US&append_to_response=credits`
      )
      .then((res) => {
        setMovieDetails(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    id && handleFetchMovieDetails();
    id && handleFetchMovieTrailer();
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
              <p className={styles.active}>OVERVIEW</p>
              <p>TRAILER</p>
              <p>SIMILAR</p>
              <p>DETAILS</p>
            </div>
            <div className={styles.nav_content}>
              <p className={styles.overview}>{movieDetails?.overview}</p>
              <div>
                <p>Starring</p>
                <p>{movieCasts}</p>
              </div>
              <div>
                <p>Created by</p>
                <p>asd</p>
              </div>
              <div>
                <p>Genre</p>
                <p>Test, test, test</p>
              </div>
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
