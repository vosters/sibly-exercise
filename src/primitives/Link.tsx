import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Paragraph from './Paragraph';

type Props = {
  bold?: boolean;
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 10,
  },
});

const Link: React.FC<Props & TouchableOpacityProps> = ({
  bold,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Paragraph style={styles.text} bold={bold}>
        {children}
      </Paragraph>
    </TouchableOpacity>
  );
};

export default Link;
