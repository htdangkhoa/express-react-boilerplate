import React from 'react';
import { RingLoader } from 'react-spinners';
import styles from './styles.scss';

const Loading = () => (
  <div className={styles.Loading}>
    <RingLoader />
  </div>
);

export default Loading;
