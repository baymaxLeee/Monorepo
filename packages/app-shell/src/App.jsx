import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router'

const App = () => {

  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
