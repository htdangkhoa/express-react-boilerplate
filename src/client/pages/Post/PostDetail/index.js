import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Layout from 'components/Layout';
import CodeBlock from 'components/CodeBlock';
import CommentBox from 'components/CommentBox';
import * as action from './action';

const PostDetail = ({
  match: { params },
  global: { accessToken },
  postDetail: { post },
  getPostDetailAction,
}) => {
  const { _id } = params;

  useEffect(() => {
    if (post?._id !== _id) {
      getPostDetailAction(_id);
    }
  }, []);

  return (
    <Layout title={post?.title || ''}>
      <ReactMarkdown source={post?.content} renderers={{ code: CodeBlock }} />

      {accessToken && post && <CommentBox />}
    </Layout>
  );
};

const mapStateToProps = ({ global, postReducer: { postDetail } }) => ({
  global,
  postDetail,
});

const mapDispatchToProps = {
  getPostDetailAction: action.getPostDetailAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
