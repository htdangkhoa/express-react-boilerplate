import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from './action';
import image from '../../assets/image.png';
import styles from './styles.scss';

const Home = ({ users }) => {
  // useEffect(() => {
  //   props.fetchUserAction();
  // }, []);

  return (
    <>
      {/* <img src={require('../../assets/image.png')} /> */}
      <img src={image} />
      <div className={styles.Home}>Home</div>

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
