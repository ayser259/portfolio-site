import React from 'react';
import ProjectDetail from '../components/ProjectDetail';

const Sighedkick = () => {
  const images = [
    'Sighedkick-Canvas1.png',
    'Sighedkick-Canvas2.png',
    'Sighedkick-Canvas3.png',
    'SighedKick-Library.png',
    'SighedKick-SharePrompt.png'
  ];

  return (
    <ProjectDetail
      projectName="SighedKick"
      projectPath="Sighedkick"
      textFileName="SighedKick"
      images={images}
    />
  );
};

export default Sighedkick;

