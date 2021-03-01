import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export type BoxProps = {
  pt?: number;
  pb?: number;
  py?: number;
  px?: number;
  mt?: number;
  mb?: number;
  my?: number;
  mx?: number;
  mr?: number;
  ml?: number;
  pr?: number;
  pl?: number;
  p?: number;
  m?: number;
  row?: boolean;
  center?: boolean;
  wrap?: boolean;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  alignContent?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  style?: ViewStyle;
};

const spacing = 8;

const styles = (props: BoxProps): any =>
  StyleSheet.create({
    view: {
      paddingTop: props.p
        ? spacing * props.p
        : props.py
        ? spacing * props.py
        : props.pt
        ? spacing * props.pt
        : 0,
      paddingBottom: props.p
        ? spacing * props.p
        : props.py
        ? spacing * props.py
        : props.pb
        ? spacing * props.pb
        : 0,
      paddingRight: props.pr ? spacing * props.pr : undefined,
      paddingLeft: props.pl ? spacing * props.pl : undefined,
      marginRight: props.mr ? spacing * props.mr : undefined,
      marginLeft: props.ml ? spacing * props.ml : undefined,
      paddingHorizontal: props.p
        ? spacing * props.p
        : props.px
        ? spacing * props.px
        : undefined,
      marginHorizontal: props.m
        ? spacing * props.m
        : props.mx
        ? spacing * props.mx
        : undefined,
      marginTop: props.m
        ? spacing * props.m
        : props.mt
        ? props.mt * spacing
        : props.my
        ? spacing * props.my
        : undefined,
      marginBottom: props.m
        ? spacing * props.m
        : props.mb
        ? props.mb * spacing
        : props.my
        ? spacing * props.my
        : undefined,
      alignItems: props.center
        ? 'center'
        : props.alignItems
        ? props.alignItems
        : undefined,
      alignContent: props.alignItems ? props.alignItems : undefined,
      flexDirection: props.row ? 'row' : 'column',
      justifyContent: props.center
        ? 'center'
        : props.justifyContent
        ? props.justifyContent
        : undefined,
      flexWrap: props.wrap ? 'wrap' : undefined,
    },
  });

const Box: React.FC<BoxProps> = (props) => {
  return (
    <View style={StyleSheet.flatten([styles(props).view, props.style])}>
      {props.children}
    </View>
  );
};

export default Box;
