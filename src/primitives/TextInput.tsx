import React from 'react';
import {
  StyleSheet,
  TextInput as RnTextInput,
  TextInputProps,
} from 'react-native';
import Paragraph from './Paragraph';

interface Props extends TextInputProps {
  label: string;
}

const TextInput: React.FC<Props> = ({ label, ...props }) => {
  return (
    <>
      <Paragraph>{label}</Paragraph>
      <RnTextInput style={styles.textInput} {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#efefef',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default TextInput;
