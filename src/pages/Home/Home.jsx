import React from 'react'
import Main from '../../components/Main/Main';
import Popular from '../../components/Popular/Popular';
import TopRated from '../../components/TopRated/TopRated';
import Trending from '../../components/Trending/Trending';
import Upcoming from '../../components/Upcoming/Upcoming';
import styles from './styles.module.css';

const Home = () => {
  return (
    <>
    <Main />
    <div className={styles.movies_carousel}>
    <Upcoming />
    <Popular />
    <Trending />
    <TopRated />
    </div>
    </>
  )
}

export default Home