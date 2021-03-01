import React from 'react';
import { FlatList as RnFlatList, FlatListProps } from './FlatList';

const ImageList: React.FC<FlatListProps<string>> = ({ ...props }) => {
  return <RnFlatList {...props} />;
};

export default ImageList;
