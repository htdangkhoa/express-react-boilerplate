import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Slider from 'react-slick';
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

const Post = ({ route: { title }, post: { posts }, getPostsAction }) => {
  useEffect(() => {
    if (!posts || posts.length === 0) {
      getPostsAction();
    }
  }, []);

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

      <div className>
        {posts.map((post) => (
          <div key={post._id}>
            <NavLink to={`/p/${post._id}`}>
              <h3>{post.title}</h3>
            </NavLink>

            <div className={styles.tagGroup}>
              {post.tags.map((tag, i) => (
                <Link to={`/tags/${tag}`} key={i} className={styles.tagItem}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        ))}
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
