import React from 'react';
import { ScrollViewProps } from 'react-native';
import { SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';
import ScrollView from './ScrollView';
import Loading from './Loading';

interface Props extends ViewProps, ScrollViewProps {
  scrollEnabled?: boolean;
  loading?: boolean;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#987554',
    flex: 1,
  },
});

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
    <SafeAreaView style={styles.screen}>
      <Loading loading={loading}>{container}</Loading>
    </SafeAreaView>
  );
};

export default Screen;
