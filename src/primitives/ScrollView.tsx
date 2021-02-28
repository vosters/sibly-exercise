import React from 'react';
import {
  ScrollView as RnScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';

const ScrollView: React.FC<ScrollViewProps> = ({ children, ...props }) => {
  return (
    <RnScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
      children={children}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default ScrollView;
