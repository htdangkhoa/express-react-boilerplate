import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import Layout from 'components/Layout';
import * as action from './action';
import image from '../../assets/image.png';
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

const Home = ({ users, route: { title }, fetchApi }) => {
  return (
    <Layout title={title} needLogin className={styles.Home}>
      <Slider {...slickSettings}>
        {slickImgs.map((img, i) => (
          <div key={i}>
            <img src={image} className={styles.bannerImg} />
          </div>
        ))}
      </Slider>

      <div>Home</div>

      <button
        onClick={() => {
          fetchApi();
        }}>
        Fetch
      </button>

      {users.map((user, i) => {
        return <p key={i}>{user.name.first}</p>;
      })}
    </Layout>
  );
};

const mapStateToProps = ({ home }) => ({
  ...home,
});

const mapDispatchToProps = {
  fetchUserAction: action.fetchUserAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
