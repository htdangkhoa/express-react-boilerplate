import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paginate from 'react-paginate';
import Layout from 'components/Layout';
import image from 'assets/image.png';
import { formatDate } from 'utils';
import * as action from './action';
import './styles.scss';

const Post = ({
  route: { title },
  post: {
    posts,
    metaData: { index: page, total },
  },
  getPostsAction,
}) => {
  useEffect(() => {
    if (!posts || posts.length === 0) {
      getPostsAction();
    }
  }, []);

  const onPageChange = ({ selected: skip }) => {
    getPostsAction(skip);
  };

  return (
    <Layout title={title}>
      <div>
        {posts.map((post) => (
          <div key={post._id} className='post-item'>
            <div>{formatDate(post.publishAt)}</div>

            <Link to={`/p/${post._id}`} className='post-title'>
              <h3>{post.title}</h3>
            </Link>

            <p className='post-description'>{post.description}</p>

            <div className='tag-group'>
              {post.tags.map((tag, i) => (
                <Link to={`/tags/${tag}`} key={i} className='tag-item'>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Paginate
          pageCount={total}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          initialPage={page}
          previousLabel={<i className='fa fa-angle-left' />}
          nextLabel={<i className='fa fa-angle-right' />}
          onPageChange={onPageChange}
          containerClassName={'pagination row'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ postReducer: { post } }) => ({ post });

const mapDispatchToProps = {
  getPostsAction: action.getPostsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
