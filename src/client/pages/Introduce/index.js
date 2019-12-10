import React from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

import source from './profile';

const Introduce = ({ route: { title } }) => {
  return (
    <>
      <Layout title={title} needLogin={false}>
        <MdViewer source={source} />
      </Layout>
    </>
  );
};

export default Introduce;
