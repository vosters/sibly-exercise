import React from 'react';
import { ScrollViewProps } from 'react-native';
import { SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';
import ScrollView from './ScrollView';
import Spinner from './Spinner';

interface Props extends ViewProps, ScrollViewProps {
  scrollEnabled?: boolean;
  loading?: boolean;
}

// Unnecessary for this one-page application, but useful when there's multiple screens and need flexibility
const Screen: React.FC<Props> = ({
  scrollEnabled,
  loading,
  children,
  ...props
}) => {
  // Allows for flexibility on a screen-level
  const container = scrollEnabled ? (
    <ScrollView {...props} children={children} />
  ) : (
    <View children={children} {...props} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner loading={loading}>{container}</Spinner>
    </SafeAreaView>
  );
};

export default Screen;