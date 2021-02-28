import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle, View } from 'react-native';
import Paragraph from './Paragraph';

interface Props {
  loading: boolean;
  style?: StyleProp<ViewStyle>;
}

const minimumLoadingTime = 1000;

const Loading: React.FC<Props> = ({ loading, style, children }) => {
  const [isSimulatingLoading, setSimulatedLoading] = useState(true);

  setTimeout(() => setSimulatedLoading(false), minimumLoadingTime);

  const loadingComponent = (
    <View
      style={[
        {
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Paragraph>Loading doggos...</Paragraph>
      <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    </View>
  );

  const child = typeof children === 'function' ? children() : children;

  return loading || isSimulatingLoading ? loadingComponent : child;
};

export default Loading;
