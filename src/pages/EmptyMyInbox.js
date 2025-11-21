import React from 'react';
import ProjectDetail from '../components/ProjectDetail';

const EmptyMyInbox = () => {
  const images = [
    'EmptyMyInbox-Catchup1.png',
    'EmptyMyInbox-Catchup2.png',
    'EmptyMyInbox-Home.png'
  ];

  return (
    <ProjectDetail
      projectName="Empty my Inbox"
      projectPath="EmptyMyInbox"
      images={images}
    />
  );
};

export default EmptyMyInbox;

