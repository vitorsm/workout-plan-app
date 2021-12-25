/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import { JSX } from '@babel/types';

import { Container, TextButton } from './style';
import colors from '../../configs/colors';
import fonts from '../../configs/fonts';

interface PlainButtonProps {
  onPress: CallableFunction,
  backgroundColor?: string,
  textColor?: string,
  fontSize?: number,
  children?: JSX.Element|string|null,
  disabled?: boolean,
}

const PlainButton: FC<PlainButtonProps> = function ({
  onPress,
  backgroundColor = colors.primary.main,
  textColor = colors.secondary.main,
  fontSize = fonts.content.size,
  children = null,
  disabled = false,
}: PlainButtonProps) {
  return (
    <Container backgroundColor={backgroundColor} onPress={onPress} disabled={disabled}>
      <TextButton color={textColor} fontSize={fontSize}>{children}</TextButton>
    </Container>
  );
};

export default PlainButton;
