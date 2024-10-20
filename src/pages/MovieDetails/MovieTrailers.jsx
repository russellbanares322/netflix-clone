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

  const handleFetchMovieTrailer = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/movie/${id}/videos?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=pt-BR&include_video_language=en`
      );
      const responseData = response.data.results;
      setMovieTrailers(responseData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    id && handleFetchMovieTrailer();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Circles
          height="80"
          width="80"
          color="#E50914"
          ariaLabel="circles-loading"
          wrapperClass={styles.spinner}
          visible={true}
        />
      ) : (
        <div className={styles.trailer_wrapper}>
          {movieTrailers.map((trailer) => (
            <div key={trailer?.id}>
              <h1>{trailer?.name}</h1>
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
    </>
  );
};

export default MovieTrailers;
