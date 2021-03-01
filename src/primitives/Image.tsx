import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { deviceWidth } from '../utils/dimensions';

type Props = {
  resize?: 'contain' | 'cover';
  center?: boolean;
};

const Image: React.FC<Props & FastImageProps> = ({
  resize = 'cover',
  center,
  style,
  ...props
}) => {
  const resizeMode =
    resize === 'cover'
      ? FastImage.resizeMode.cover
      : FastImage.resizeMode.contain;
  return (
    <FastImage
      style={StyleSheet.flatten([styles({ center }).image, style])}
      resizeMode={resizeMode}
      {...props}
    />
  );
};

const styles = (props: Props): any =>
  StyleSheet.create({
    image: {
      width: deviceWidth / 4,
      height: deviceWidth / 4,
      alignSelf: props.center ? 'center' : undefined,
    },
  });

export default Image;
