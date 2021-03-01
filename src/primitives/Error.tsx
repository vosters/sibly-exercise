import React from 'react';
import { Paragraph } from '.';

export interface ErrorProps {
  error?: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Paragraph bold center color="error" style={{ marginTop: 10 }}>
      {error}
    </Paragraph>
  );
};

export default Error;
