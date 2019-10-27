import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as action from './action';
import image from '../../assets/image.png';
import styles from './styles.scss';

const Home = ({ users }) => {
  // useEffect(() => {
  //   props.fetchUserAction();
  // }, []);

  const [t, i18n] = useTranslation();

  return (
    <>
      {/* <img src={require('../../assets/image.png')} /> */}
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

      {users.map((user, i) => {
        return <p key={i}>{user.name.first}</p>;
      })}
    </>
  );
};

const mapStateToProps = ({ home: { users } }) => ({
  users: users,
});

const mapDispatchToProps = {
  fetchUserAction: action.fetchUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
