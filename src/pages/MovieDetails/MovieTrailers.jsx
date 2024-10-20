import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/MovieApi';
import YouTube from 'react-youtube';
import styles from './styles.module.css';
import { Circles } from 'react-loader-spinner';

const MovieTrailers = () => {
  const { id } = useParams();
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showLoaderSpinner = isLoading;
  const showTrailerComponent = !isLoading && movieTrailers?.length > 0;

  const handleFetchMovieTrailer = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/movie/${id}/videos?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=pt-BR&include_video_language=en`
      );
      const responseData = response?.data?.results?.filter(
        (item) => item.official
      );
      setMovieTrailers(responseData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(err);
    }
  };

  useEffect(() => {
    id && handleFetchMovieTrailer();
  }, [id]);

  return (
    <>
      {showLoaderSpinner && (
        <Circles
          height="80"
          width="80"
          color="#E50914"
          ariaLabel="circles-loading"
          wrapperClass={styles.spinner}
          visible={true}
        />
      )}
      {showTrailerComponent && (
        <div className={styles.trailer_wrapper}>
          {movieTrailers.map((trailer) => (
            <div
              style={{ display: 'flex', flexDirection: 'column' }}
              key={trailer?.id}
            >
              <p className={styles.trailer_name}>{trailer?.name}</p>
              <YouTube
                opts={{
                  width: '100%',
                  height: '100%',
                }}
                videoId={trailer?.key}
                id={trailer?.id}
                className={styles.video_player}
              />
            </div>
          ))}
        </div>
      )}
      {!showTrailerComponent && (
        <p
          style={{
            marginTop: '20px',
            marginBottom: '10px',
            fontSize: '1.5rem',
          }}
        >
          No trailer to be shown.
        </p>
      )}
    </>
  );
};

export default MovieTrailers;
