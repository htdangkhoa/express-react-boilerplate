import App from './client/app';
import { Login, Home, About, NotFound } from './client/pages';
import { fetchUserAction } from './client/pages/Home/action';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        title: 'Home',
        loadData: ({ params }) => [fetchUserAction()],
      },
      {
        path: '/login',
        component: Login,
        title: 'Login',
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
