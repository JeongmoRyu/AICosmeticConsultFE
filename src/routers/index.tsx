import { RouteObject, useRoutes } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import { ADMIN, CDP, CONSULTING, HOME, PIMS } from 'data/routers';
import Consulting from 'pages/Consulting';
import Cdp from 'pages/Cdp';
import Pims from 'pages/Pims';
import Admin from 'pages/Admin';
import KakaoFGT from 'pages/KakaoFGT';

const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      path: HOME,
      element: <MainLayout />,
      children: [
        {
          path: HOME,
          element: <KakaoFGT />,
        },
        {
          path: CONSULTING,
          element: <Consulting />,
        },
        {
          path: CDP,
          element: <Cdp />,
        },
        {
          path: PIMS,
          element: <Pims />,
        },
        {
          path: ADMIN,
          element: <Admin />,
        },
      ],
    },
  ];

  return useRoutes(routes);
};
export default AppRouter;
