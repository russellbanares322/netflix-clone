import React, { useState } from 'react';
import styles from './styles.module.css';
import { Form, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import AuthLayout from '../../layout/AuthLayout/AuthLayout';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    'Sign In'
  );

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      toast.success('Successfully logged in');
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout onClick={() => setShow(false)}>
      <Col lg={12} className={styles.form_col}>
        <Form className={styles.form}>
          <p className={styles.title}>Sign In</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              className={styles.email_input}
              type="email"
              placeholder="Email or phone number"
            />
          </Form.Group>
          <Form.Group
            style={{ position: 'relative' }}
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setShow(!show)}
              className={styles.password_input}
              type="password"
              placeholder="Password"
            />
            {show && <p className={styles.show_pass}>SHOW</p>}
          </Form.Group>
          <div className="d-grid gap-2">
            <button
              disabled={isLoading}
              onClick={handleSignIn}
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
              New to Netflix?
              <span
                className={styles.signup_text}
                onClick={() => navigate('/sign-up')}
              >
                Sign up now.
              </span>
            </p>
            <p className={styles.captcha_text}>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <Link className={styles.learn_text}>Learn more.</Link>
            </p>
          </div>
        </Form>
      </Col>
    </AuthLayout>
  );
};

export default SignIn;
