import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/MovieApi';
import YouTube from 'react-youtube';
import styles from './styles.module.css';

const MovieTrailer = () => {
  const { id } = useParams();
  const [movieTrailer, setMovieTrailer] = useState([]);

  const handleFetchMovieTrailer = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    id && handleFetchMovieTrailer();
  }, [id]);

  return (
    <div className={styles.trailer_wrapper}>
      {movieTrailer.map((trailer) => (
        <div key={trailer?.id}>
          <YouTube videoId={trailer?.key} id={trailer?.id} />
        </div>
      ))}
    </div>
  );
};

export default MovieTrailer;
