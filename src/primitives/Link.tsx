import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 20,
  },
});

const Link: React.FC<TouchableOpacityProps> = ({ children, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Link;
