import React from 'react';
import {
  StyleSheet,
  TextInput as RnTextInput,
  TextInputProps,
} from 'react-native';
import Paragraph from './Paragraph';

interface Props extends TextInputProps {
  label?: string;
}

const TextInput: React.FC<Props> = ({ label, ...props }) => {
  return (
    <>
      {label && <Paragraph>{label}</Paragraph>}
      <RnTextInput style={styles.textInput} {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#efefef',
    borderRadius: 6,
    padding: 15,
    marginVertical: 10,
    fontSize: 18,
  },
});

export default TextInput;
