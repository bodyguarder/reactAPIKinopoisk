import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './pages/Root';
import MoviePage from './pages/MoviePage';
import ErrorPage404 from './error-page-404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage404></ErrorPage404>,
  },
  {
    path: 'movies/:movieId',
    element: <MoviePage></MoviePage>,
    errorElement: <ErrorPage404></ErrorPage404>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
