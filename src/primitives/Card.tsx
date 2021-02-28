import React from 'react';
import { StyleSheet } from 'react-native';
import Box, { BoxProps } from './Box';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e5D3B3',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 3,
  },
});

const Card: React.FC<BoxProps> = ({ ...props }) => {
  return <Box style={styles.card} px={4} py={3} m={3} {...props}></Box>;
};

export default Card;
