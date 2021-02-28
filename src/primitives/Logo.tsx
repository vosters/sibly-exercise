import React from 'react';
import Image from './Image';

const Logo: React.FC = () => {
  return (
    <Image
      center
      resize="contain"
      source={require('../assets/images/dog.png')}
    />
  );
};

export default Logo;
