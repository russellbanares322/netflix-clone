import React from 'react'
import styles from './styles.module.css'
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div className={styles.nav_wrapper}>
            <h1 className={styles.title} onClick={() => navigate('/')}>Netflix</h1>
            <div>
                <button className={styles.signin_button} onClick={() => navigate('/sign-in')}>Sign In</button>
                <button onClick={() => navigate('/sign-up')} className={styles.signup_button}>Sign Up</button>
            </div>
    </div>
  )
}

export default Navbar;