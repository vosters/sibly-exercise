import React from 'react';
import { Text, TextProps } from 'react-native';

const Paragraph: React.FC<TextProps> = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

export default Paragraph;
