import React from 'react';
import '../index.css';

const Photo = (props) => {
  const { photo } = props;
  return (
    <li>
      <img src={photo} alt={photo.id} />
    </li>
  );
};

export default Photo;
