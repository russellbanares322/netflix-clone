import React from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import styles from './styles.module.css';

const AddtoFavorites = () => {
  return (
    <div><HiOutlineHeart className={styles.heart} size={20}/></div>
  )
}

export default AddtoFavorites