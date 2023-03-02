import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import Popular from '../../components/Popular/Popular';
import YouTube from 'react-youtube';
import api from '../../api/MovieApi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchMovieTrailer = async () => {
    try {
      const response = await api.get(
        `/movie/${id}/videos?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=pt-BR&include_video_language=en`
      );
      console.log(response.data);
      setMovieTrailer(
        response.data.results.filter(
          (val) => val.name.toUpperCase() === 'OFFICIAL TRAILER'
        )
      );
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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.header}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            />
            <p className={styles.main_title}>{movieDetails?.original_title}</p>
            <span className={styles.movie_overview}>
              {movieDetails?.overview}
            </span>
            <span className={styles.movie_release_date}>
              Released: {movieDetails?.release_date}
            </span>
            <div className={styles.gradient}></div>
            <div className={styles.gradient2}></div>
          </div>
          <div className={styles.trailer_wrapper}>
            <div className={styles.trailer_description}>
              <p>Movie Details</p>
              <p className={styles.movie_details}>{movieDetails?.overview}</p>
            </div>
            <div className={styles.trailer_video}>
              <p>Official Trailer</p>
              {movieTrailer?.map((video) => (
                <div className={styles.trailer_video_wrapper} key={video?.id}>
                  <YouTube
                    className={styles.trailer_video}
                    videoId={video?.key}
                    id={video?.key}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.movie_wrapper}>
            <p className={styles.recommended_movie_text}>Recommended Movies</p>
            {/* RECOMMENDED COMPONENT HERE */}
            <p className={styles.similar_movie_text}>Similar Movies</p>
            {/* SIMILAR COMPONENT HERE */}
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
