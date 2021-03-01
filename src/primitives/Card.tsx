import React from 'react';
import { StyleSheet } from 'react-native';
import Box, { BoxProps } from './Box';
import { colors } from '../constants';
import { ColorProps } from '../types';

const styles = (props: ColorProps): any =>
  StyleSheet.create({
    card: {
      backgroundColor: props.color ? colors[props.color] : colors.brownLightest,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 7,
      elevation: 3,
    },
  });

const Card: React.FC<ColorProps & BoxProps> = ({ color, style, ...props }) => {
  return (
    <Box
      style={StyleSheet.flatten([styles({ color }).card, style])}
      px={3}
      pt={3}
      pb={3}
      mx={2}
      mt={2}
      {...props}></Box>
  );
};

export default Card;
