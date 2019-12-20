import Login from 'pages/Login';
import Register from 'pages/Register';
import Post from 'pages/Post';
import { getPostsAction } from 'pages/Post/action';
import PostDetail from 'pages/Post/PostDetail';
import {
  getPostDetailAction,
  getCommentsAction,
} from 'pages/Post/PostDetail/action';
import CreatePost from 'pages/Post/CreatePost';
import Introduce from 'pages/Introduce';
import Projects from 'pages/Introduce/Projects';
import Contact from 'pages/Contact';
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
        loadData: ({ params: { _id } }) => [
          getPostDetailAction(_id),
          getCommentsAction(_id),
        ],
      },
      {
        path: '/create-post',
        component: CreatePost,
        title: 'Create post',
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
        path: '/introduce/projects',
        component: Projects,
        title: 'Projects',
      },
      {
        path: '/introduce',
        component: Introduce,
        title: 'Introduce',
      },
      {
        path: '/contact',
        component: Contact,
        title: 'Contact',
      },
      {
        component: NotFound,
        title: 'Error',
      },
    ],
  },
];
