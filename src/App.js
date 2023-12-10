import React from 'react';
import AppLayer from './AppLayer/AppLayer';
import MainApp from './MainList/MainApp.js';
import EditPanel from './EditPanel.js';
import { 
  RouterProvider,
  createBrowserRouter
 } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayer,
    children: [
      {
        path: "/",
        Component: MainApp,
        children: [
          {
            path: "task/:id",
            Component: EditPanel,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
