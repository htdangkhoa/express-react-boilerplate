import App from './client/App';
import { Home, About, NotFound } from './client/pages';
import { fetchUserAction } from './client/pages/Home/action';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: ({ params }) => [fetchUserAction()],
      },
      {
        path: '/about',
        component: About,
      },
      {
        component: NotFound,
      },
    ],
  },
];
