import React from 'react';

const StudentsPage = React.lazy(() => import('./StudentsPage'));
export const studentsPagesConfigs = [
  {
    path: '/students',
    element: <StudentsPage />,
  },
];
