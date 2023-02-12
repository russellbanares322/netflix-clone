import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    toast.success('Successfully logged out');
    signOut(auth);
    navigate('/');
  };
  return (
    <div className={styles.nav_wrapper}>
      <h1 className={styles.title} onClick={() => navigate('/')}>
        Netflix
      </h1>
      {/* <h1 onClick={ () => navigate('/projects')}>Projects</h1> */}
      {/* <h1 onClick={ () => navigate('/sidebar')}>Sidebar</h1> */}
      <div>
        {user ? (
          <div className={styles.username_wrapper}>
            <div>
              <span
                className={styles.favorites}
                onClick={() => navigate('/favorites')}
              >
                Favorites
              </span>
            </div>
            <div>
              <button className={styles.logout_button} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.button_wrapper}>
            <button
              className={styles.signin_button}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className={styles.signup_button}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
