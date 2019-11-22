import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Paginate from 'react-paginate';
import Layout from 'components/Layout';
import image from 'assets/image.png';
import * as action from './action';
import styles from './styles.scss';

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

const slickImgs = [image, image, image];

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
        <Slider {...slickSettings}>
          {slickImgs.map((img, i) => (
            <div key={i}>
              <img src={image} className={styles.bannerImg} />
            </div>
          ))}
        </Slider>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <Link to={`/p/${post._id}`}>
              <h3>{post.title}</h3>
            </Link>

            <div className={styles.tagGroup}>
              {post.tags.map((tag, i) => (
                <Link to={`/tags/${tag}`} key={i} className={styles.tagItem}>
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
          containerClassName={'pagination'}
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
