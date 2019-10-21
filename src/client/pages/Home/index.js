import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from './action';

const Home = ({ users }) => {
  // useEffect(() => {
  //   props.fetchUserAction();
  // }, []);

  return (
    <>
      <div>Home</div>

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
