import React from 'react';
import { ScrollView as RnScrollView, ScrollViewProps } from 'react-native';

const ScrollView: React.FC<ScrollViewProps> = ({ children, ...props }) => {
  return (
    <RnScrollView
      contentInsetAdjustmentBehavior="automatic"
      children={children}
      {...props}
    />
  );
};

export default ScrollView;
