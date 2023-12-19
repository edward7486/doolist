import React from 'react';
import AppLayer from './AppLayer/AppLayer';
import MainApp from './MainList/MainApp.js';
import EditPanel from './EditPanel.js';
import DeleteModal from './DeleteModal.js';
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
          {
            path: "task/:id/delete",
            Component: DeleteModal,
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
