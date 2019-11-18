import Login from 'pages/Login';
import Register from 'pages/Register';
import Home from 'pages/Home';
import { fetchUserAction } from 'pages/Home/action';
import Post from 'pages/Post';
import { getPostsAction } from 'pages/Post/action';
import About from 'pages/About';
import NotFound from 'pages/NotFound';
import App from './client/app';

export default [
  {
    component: App,
    routes: [
      // {
      //   path: '/',
      //   exact: true,
      //   component: Home,
      //   title: 'Home',
      //   loadData: ({ _params }) => [fetchUserAction()],
      // },
      {
        path: '/',
        exact: true,
        component: Post,
        title: 'Post',
        loadData: ({ _params }) => [getPostsAction()],
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
