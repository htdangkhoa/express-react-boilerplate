import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import * as action from './action';

const Post = ({
  route: { title },
  post: { posts, error },
  // error,
  getPostsAction,
}) => {
  // useEffect(() => {
  //   getPostsAction();
  // }, []);

  return (
    <Layout title={title}>
      <div>Post</div>
      {posts.map((post, i) => (
        <div key={i}>{post.title}</div>
      ))}
    </Layout>
  );
};

const mapStateToProps = ({ post }) => ({ post });

const mapDispatchToProps = {
  getPostsAction: action.getPostsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
