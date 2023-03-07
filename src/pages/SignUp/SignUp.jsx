import React, { useState } from 'react';
import styles from './styles.module.css';
import { Form, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Button state depending on isLoading
  const buttonState = isLoading ? (
    <ThreeDots
      height="26"
      width="40"
      radius="6"
      color="#F5F5F5"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  ) : (
    'Sign Up'
  );

  //Signup handler
  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: userName });
      setDoc(doc(db, 'users', email), {
        savedMovies: [],
      });
      setIsLoading(false);
      navigate('/');
      toast.success('Successfully created an account');
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.gradient}></div>
      <div className={styles.gradient2}></div>
      <Col lg={12} className={styles.form_col}>
        <Form className={styles.form}>
          <p className={styles.title}>Sign Up</p>
          <Form.Group className="mb-3">
            <Form.Control
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.name_input}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.email_input}
              type="email"
              placeholder="Email or phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.password_input}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className={styles.button}
            >
              {buttonState}
            </button>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <Form.Group
              className={styles.checkbox}
              controlId="formBasicCheckbox"
            >
              <Form.Check
                className={styles.checkbox}
                type="checkbox"
                label="Remember me"
              />
            </Form.Group>
            <p className={styles.help_text}>Need help?</p>
          </div>
          <div className={styles.form_footer}>
            <p className={styles.new_text}>
              Already have an account?{' '}
              <span onClick={() => navigate('/sign-in')}>Sign in now.</span>
            </p>
            <p className={styles.captcha_text}>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <Link className={styles.learn_text}>Learn more.</Link>
            </p>
          </div>
        </Form>
      </Col>
    </div>
  );
};

export default SignUp;
