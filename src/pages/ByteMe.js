import React from 'react';
import ProjectDetail from '../components/ProjectDetail';

const ByteMe = () => {
  const images = [
    'ByteMe-Chat1.png',
    'ByteMe-Chat2.png',
    'ByteMe-Dashboard1.png',
    'ByteMe-Dashboard2.png',
    'ByteMe-Dashboard3.png',
    'ByteMe-KeyManagement.png',
    'ByteMe-MultimodalEntry.png'
  ];

  return (
    <ProjectDetail
      projectName="ByteMe"
      projectPath="ByteMe"
      images={images}
    />
  );
};

export default ByteMe;

