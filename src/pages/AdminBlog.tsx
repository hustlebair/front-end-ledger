import React from 'react';
import { Helmet } from 'react-helmet-async';
import KideraAdminDashboard from '../components/KideraAdminDashboard';

const AdminBlog: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Kidera Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <KideraAdminDashboard />
    </>
  );
};

export default AdminBlog;