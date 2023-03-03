import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/MovieApi';
import YouTube from 'react-youtube';
import styles from './styles.module.css';
import Spinner from '../../components/Spinner/Spinner';
import { Circles } from 'react-loader-spinner';

const MovieTrailer = () => {
  const { id } = useParams();
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchMovieTrailer = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/movie/${id}/videos?api_key=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&language=pt-BR&include_video_language=en`
      );
      const filteredResponse = response.data.results.filter(
        (val) => val.name.toUpperCase() === 'OFFICIAL TRAILER'
      );
      setMovieTrailer(filteredResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
          {movieTrailer.map((trailer) => (
            <div key={trailer?.id}>
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

export default MovieTrailer;
