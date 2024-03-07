import styles from './styles.module.css';

const AuthLayout = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.auth_wrapper}>
      <div className={styles.gradient}></div>
      <div className={styles.gradient2}></div>
      {children}
    </div>
  );
};

export default AuthLayout;
