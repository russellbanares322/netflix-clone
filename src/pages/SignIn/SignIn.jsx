import React, {useState} from 'react'
import styles from './styles.module.css';
import {Form, Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.form_wrapper} onClick={() => setShow(false)}>
      <div className={styles.gradient}></div>
      <div className={styles.gradient2}></div>
      <Col lg={12} className={styles.form_col}>
       <Form className={styles.form}>
        <p className={styles.title}>Sign In</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className={styles.email_input} type="email" placeholder="Email or phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control onClick={() => setShow(!show)} className={styles.password_input} type="password" placeholder="Password" />
        {show && <p className={styles.show_pass}>SHOW</p>}
      </Form.Group>
      <div className='d-grid gap-2'>
        <button className={styles.button}>Sign In</button>
      </div>
      <div className='d-flex justify-content-start align-items-center'>
      <Form.Group className={styles.checkbox}controlId="formBasicCheckbox">
        <Form.Check className={styles.checkbox} type="checkbox" label="Remember me" />
      </Form.Group>
      <p className={styles.help_text}>Need help?</p>
      </div>
      <div className={styles.form_footer}>
        <p className={styles.new_text}>New to Netflix? <span onClick={() => navigate('/sign-up')}>Sign up now.</span></p>
        <p className={styles.captcha_text}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <Link  className={styles.learn_text}>Learn more.</Link></p>
      </div>
    </Form>
    </Col>
    </div>
  )
}

export default SignIn