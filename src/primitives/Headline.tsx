import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type Props = {
  center?: boolean;
};
const styles = (props: Props): any =>
  StyleSheet.create({
    headline: {
      fontSize: 26,
      fontWeight: '700',
      color: '#664229',
      textAlign: props.center ? 'center' : undefined,
      marginBottom: 10,
    },
  });

const Headline: React.FC<Props & TextProps> = (props) => {
  return <Text style={styles(props).headline}>{props.children}</Text>;
};

export default Headline;
