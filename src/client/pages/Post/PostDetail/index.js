import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Converter } from 'showdown';
import Layout from 'components/Layout';
import CodeBlock from 'components/CodeBlock';
import * as action from './action';

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const PostDetail = ({
  match: { params },
  global: { accessToken },
  postDetail: { post, comments, error },
  getPostDetailAction,
  getCommentsAction,
  postCommentAction,
}) => {
  const { _id } = params;

  useEffect(() => {
    if (post?._id !== _id) {
      getPostDetailAction(_id);

      if (comments.length === 0) {
        getCommentsAction(_id);
      }
    }

    if (error) {
      toast.error(error?.message);
    }
  }, []);

  const [source, setSource] = useState('');

  const [selectedTab, setSelectedTab] = useState('write');

  const onInputChange = (value) => {
    setSource(value);
  };

  const onPostComment = () =>
    postCommentAction({ _id: post._id, comment: source });

  return (
    <Layout title={post?.title || ''}>
      <ReactMarkdown source={post?.content} renderers={{ code: CodeBlock }} />

      <div>
        <h3>Comments</h3>

        {comments.map((comment) => (
          <ReactMarkdown
            key={comment._id}
            source={comment.comment}
            escapeHtml
            skipHtml
          />
        ))}

        {!accessToken && (
          <>
            <div className='card'>
              <div className='card-body text-center'>Login to comment.</div>
            </div>
          </>
        )}

        {accessToken && (
          <>
            <ReactMde
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              onChange={onInputChange}
              value={source}
              generateMarkdownPreview={async (markdown) => {
                const html = await converter.makeHtml(markdown);

                return html;
              }}
            />

            <button className='btn btn-primary' onClick={onPostComment}>
              Post Comment
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ global, postReducer: { postDetail } }) => ({
  global,
  postDetail,
});

const mapDispatchToProps = {
  getPostDetailAction: action.getPostDetailAction,
  getCommentsAction: action.getCommentsAction,
  postCommentAction: action.postCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
