import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const MovieDetails = () => {
    const {id} = useParams();
    const [movieDetails, setMovieDetails] = useState([]);

    const handleFetchMovieDetails = async() => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&append_to_response=credits`).then((res) => {
            setMovieDetails(res.data)
            console.log(res.data)
        }).catch((err) => {
            toast.error(err.message)
        })
    }

    useEffect(() => {
        id && handleFetchMovieDetails();
    }, [id])
  return (
    <>
    <div className={styles.body}>
        <div className={styles.gradient}></div>
        <div className={styles.gradient2}></div>
    </div>
     <div className={styles.movie_wrapper}>
        <div className={styles.left}>
            <span className={styles.movie_title}>{movieDetails?.original_title}</span>
            <span className={styles.movie_status}>STATUS: {movieDetails?.status}</span>
            <span className={styles.movie_release_date}>RELEASE DATE: {movieDetails?.release_date}</span>
            <span  className={styles.movie_vote_average}>VOTE AVERAGE: <span style={{color: movieDetails?.vote_average  > 1 ? 'green' : 'red'}}>{movieDetails?.vote_average}</span></span>
            <span className={styles.movie_overview}>{movieDetails?.overview}</span>
            <span className={styles.movie_link}>{movieDetails?.homepage}</span>
        </div>
        <div className={styles.right}>
            <img className={styles.movie_img} src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}/></div>
        </div>
     </>
  )
}

export default MovieDetails