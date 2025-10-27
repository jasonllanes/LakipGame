import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';

// const Page1= lazy(() =>
//   wait(1300).then(() => import("./screens/page1.tsx"))
// );

// const Page2= lazy(() =>
//   wait(1300).then(() => import("./screens/page2.tsx"))
// );

const LakipGame = lazy(() =>
  wait(1300).then(() => import("./screens/lakip_game/LakipGameMainContainer.tsx"))
);

const MainPage = lazy(() =>
  wait(2300).then(() => import("./screens/choose_game.tsx"))
);


const router = createBrowserRouter([
  {
    path: "/lakip",
    element: <Navigate to="/lakip/main-page" />,
  },
  {
    path: "/lakip/main-page",
    element: <>
      <Suspense fallback={<Loader />}>
        <MainPage />
      </Suspense>
    </>,
  },

  {
    path: "/lakip/lakip-game",
    element: <>
      <Suspense fallback={<Loader />}>
        <LakipGame />
      </Suspense>
    </>,
  },


  {
    path: "*",
    element: <NotFound />,
  },
]);

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
