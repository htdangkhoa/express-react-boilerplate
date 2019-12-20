import React from 'react';
import { Link } from 'react-router-dom';
import chunk from 'lodash/chunk';
import take from 'lodash/take';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

import './styles.scss';

import { profile, projects } from './profile';

const newest = take(projects, 3);

if (projects.length > 3) newest.push(null);

const projectsGrouped = chunk(newest, 2);

const Introduce = ({ route: { title } }) => {
  return (
    <>
      <Layout title={title} needLogin={false}>
        <MdViewer source={profile} />

        <MdViewer source='## Projects' />

        {projectsGrouped.map((group, i) => {
          return (
            <div className='row' key={i}>
              {group.map((item, j) => {
                if (!item) {
                  return (
                    <Link
                      to='/introduce/projects'
                      className='col col-12 col-md-6 btn__more'
                      key={j}>
                      <div className='text-center'>
                        <i className='fas fa-ellipsis-h fa-lg'></i>
                        <p>More</p>
                      </div>
                    </Link>
                  );
                }

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
    </>
  );
};

export default Introduce;
