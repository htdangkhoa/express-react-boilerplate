import React from 'react';
import { RingLoader } from 'react-spinners';
import styles from './styles.scss';

const Loading = () => (
  <div className={styles.app__loading}>
    <RingLoader />
  </div>
);

export default Loading;
