import Login from 'pages/Login';
import Register from 'pages/Register';
import Post from 'pages/Post';
import PostDetail from 'pages/Post/PostDetail';
import { getPostDetailAction } from 'pages/Post/PostDetail/action';
import { getPostsAction } from 'pages/Post/action';
import About from 'pages/About';
import NotFound from 'pages/NotFound';
import App from './client/app';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Post,
        title: 'Post',
        loadData: ({ _params }) => [getPostsAction()],
      },
      {
        path: '/p/:_id',
        component: PostDetail,
        loadData: ({ params: { _id } }) => [getPostDetailAction(_id)],
      },
      {
        path: '/login',
        component: Login,
        title: 'Login',
      },
      {
        path: '/register',
        component: Register,
        title: 'Register',
      },
      {
        path: '/about',
        component: About,
        title: 'About',
      },
      {
        component: NotFound,
        title: 'Error',
      },
    ],
  },
];
