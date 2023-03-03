import React from 'react';
import styles from './styles.module.css';
import { Circles } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className={styles.spinner_wrapper}>
      <Circles
        height="50"
        width="50"
        color="#E50914"
        ariaLabel="circles-loading"
        wrapperClass={styles.spinner}
        visible={true}
      />
    </div>
  );
};

export default Spinner;
