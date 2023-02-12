import React from 'react';
import styles from './styles.module.css';
import { GoTriangleDown } from 'react-icons/go';
import { RxGlobe } from 'react-icons/rx';

const Footer = () => {
  return (
    <div className={styles.body}>
      <div className={styles.footer_wrapper}>
        <p className={styles.question_text}>Questions? Contact us.</p>
        <div className={styles.footer_row}>
          <div>
            <ul>
              <li>FAQ</li>
              <li>Investors Relation</li>
              <li>Ways to watch</li>
              <li>Corporate Information</li>
              <li>Only on Netflix</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Help Center</li>
              <li>Jobs</li>
              <li>Ways to watch</li>
              <li>Term of Use</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Account</li>
              <li>Redeem Gift Cards</li>
              <li>Ways to watch</li>
              <li>Privacy</li>
              <li>Speed Test</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Media Center</li>
              <li>Buy Gift Cards</li>
              <li>Cookie Preferences</li>
              <li>Corporate Information</li>
              <li>Legal Notices</li>
            </ul>
          </div>
        </div>
        <div className={styles.select_wrapper}>
          <select>
            <option>English</option>
            <option>Filipino</option>
          </select>
          <RxGlobe className={styles.globe} size={20} />
          <GoTriangleDown className={styles.triangle} size={15} />
        </div>
        <div className={styles.brand_name_wrapper}>
          <p>Netflix Philippines</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
