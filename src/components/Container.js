import React from 'react';
import '../index.css';
import Photo from './Photo';
import NotFound from './NotFound';

const Container = (props) => {
  const { images } = props;
  const { loading } = props;

  let photo;
  if (images.length > 0) {
    photo = images.map((image, index) => <Photo photo={image} key={index} />);
  }
  if (images.length === 0 && !loading) {
    photo = <NotFound />;
  }

  if (images.length === 0 && loading) {
    photo = <h1>Loading</h1>;
  }

  return (
    <div className="photo-container">
      <ul>{photo}</ul>
    </div>
  );
};

export default Container;
