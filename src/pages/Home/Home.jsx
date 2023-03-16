import React from 'react';
import Footer from '../../components/Footer/Footer';
import Horror from '../../components/Horror/Horror';
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
        <div className={styles.gradient}></div>
        <Horror />
        <Upcoming />
        <Popular />
        <Trending />
        <TopRated />
        <hr
          style={{
            height: '0.4rem',
            backgroundColor: 'grey',
            marginTop: '4rem',
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
