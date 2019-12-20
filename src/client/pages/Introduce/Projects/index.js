import React from 'react';
import chunk from 'lodash/chunk';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

import { projects } from '../profile';

const projectsGrouped = chunk(projects, 2);

const Projects = ({ route: { title } }) => {
  return (
    <Layout title={title} needLogin={false}>
      <MdViewer source='# Projects' />

      {projectsGrouped.map((group, i) => {
        return (
          <div className='row' key={i}>
            {group.map((item, j) => {
              return (
                <div className='col col-12 col-md-6' key={j}>
                  <MdViewer source={item.source.trim()} />
                </div>
              );
            })}
          </div>
        );
      })}
    </Layout>
  );
};

export default Projects;
