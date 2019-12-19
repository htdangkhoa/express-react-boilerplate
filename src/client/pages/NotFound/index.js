import React from 'react';

import Layout from 'components/Layout';

import './styles.scss';

const NotFound = ({ route: { title }, staticContext = {} }) => {
  staticContext.status = '404';

  return (
    <Layout title={title} className='not__found__container' needLogin={false}>
      <div className='text-center'>
        <h1>404</h1>
        <p>The page you&apos;re looking for isn&apos;t here.</p>
      </div>
    </Layout>
  );
};

export default NotFound;
