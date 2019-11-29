import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Converter } from 'showdown';
import moment from 'moment-timezone';
import Layout from 'components/Layout';
import * as action from './action';
import '../styles.scss';

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  omitExtraWLInCodeBlocks: true,
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
    }

    if (comments?.length === 0 || post?._id !== _id) {
      getCommentsAction(_id);
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

  const onPostComment = () => {
    postCommentAction({ _id, comment: source });

    setSource('');
  };

  return (
    <Layout title={post?.title || ''}>
      <div className='post-item'>
        <h1 className='post-title'>{post?.title}</h1>

        <div className='tag-group'>
          {post?.tags?.map((tag, i) => (
            <Link to={`/tags/${tag}`} key={i} className='tag-item'>
              {tag}
            </Link>
          ))}
        </div>

        <ReactMarkdown source={post?.content} />
      </div>

      <hr />

      <div className='comment-container'>
        <h5>Comments</h5>

        {!accessToken && (
          <>
            <div className='card comment-login'>
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

            <button
              className='btn btn-primary btn-block comment-submit'
              onClick={onPostComment}>
              Post Comment
            </button>
          </>
        )}

        {comments?.map((comment) => (
          <div className='card comment-item' key={comment._id}>
            <div className='card-body'>
              <div>{comment.user_id}</div>

              <ReactMarkdown
                key={comment?._id}
                source={comment?.comment}
                escapeHtml
                skipHtml
              />
              <div>
                {moment(comment.createAt || new Date())
                  .format('MMM DD, YYYY')
                  .toString()}
              </div>
            </div>
          </div>
        ))}
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
