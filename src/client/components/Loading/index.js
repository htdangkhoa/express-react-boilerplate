import React from 'react';
import { RingLoader } from 'react-spinners';
import './styles.scss';

const Loading = () => (
  <div className='app__loading'>
    <RingLoader />
  </div>
);

export default Loading;
