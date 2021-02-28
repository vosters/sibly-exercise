import React from 'react';
import { ImageStyle, ImagePropTypes, StyleProp } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

type Props = {
  uri: string;
  style?: StyleProp<ImageStyle>;
};

const Image: React.FC<FastImageProps> = ({ ...props }) => {
  return (
    <FastImage
      style={{ width: 100, height: 100 }}
      resizeMode={FastImage.resizeMode.cover}
      {...props}
    />
  );
};

export default Image;
