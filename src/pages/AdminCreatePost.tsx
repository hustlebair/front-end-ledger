import React from 'react';
import { Helmet } from 'react-helmet-async';
import KideraCreatePost from '../components/KideraCreatePost';

const AdminCreatePost: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Create Post | Kidera Blog Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <KideraCreatePost />
    </>
  );
};

export default AdminCreatePost;
