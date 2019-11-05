import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Layout from 'components/Layout';
import cookies from 'utils/cookies';
import * as action from './action';
import image from '../../assets/image.png';
import styles from './styles.scss';

const Home = ({ users, route: { title }, fetchApi, fetchUserAction }) => {
  useEffect(() => {
    fetchUserAction();
  }, []);

  const [t, i18n] = useTranslation();

  return (
    <Layout title={title} needLogin>
      <img src={image} />
      <div className={styles.Home}>Home</div>

      <p>{t('hello')}</p>

      <p>
        <input
          type='checkbox'
          onChange={async (event) => {
            await i18n.changeLanguage(event.target.checked ? 'vi' : 'en');
          }}
        />
        {' Change lang'}
      </p>

      <button
        onClick={() => {
          fetchApi();
        }}>
        Fetch
      </button>

      {users.map((user, i) => {
        return <p key={i}>{user.name.first}</p>;
      })}
    </Layout>
  );
};

const mapStateToProps = ({ home }) => ({
  ...home,
});

const mapDispatchToProps = {
  fetchUserAction: action.fetchUserAction,
  fetchApi: action.fetchApiAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
