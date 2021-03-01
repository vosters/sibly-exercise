import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../constants';
import { ColorProps } from '../types';

interface Props extends ColorProps {
  bold?: boolean;
  center?: boolean;
}

const styles = (props: Props): any =>
  StyleSheet.create({
    paragraph: {
      fontSize: 20,
      fontWeight: props.bold ? '700' : '400',
      color: props.color ? colors[props.color] : colors.brownDark,
      // marginBottom: 10,
      textAlign: props.center ? 'center' : undefined,
    },
  });

const Paragraph: React.FC<Props & TextProps> = ({
  color,
  bold,
  style,
  center,
  children,
  ...props
}) => {
  return (
    <Text
      style={StyleSheet.flatten([
        styles({ color, bold, center }).paragraph,
        style,
      ])}>
      {children}
    </Text>
  );
};

export default Paragraph;
