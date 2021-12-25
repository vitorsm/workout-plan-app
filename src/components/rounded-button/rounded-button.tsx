/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import { JSX } from '@babel/types';
import { ViewStyle } from 'react-native';
import { Container, ButtonText } from './style';
import colors from '../../configs/colors';
import fonts from '../../configs/fonts';

interface RoundedButtonProps {
  children: JSX.Element|undefined|string,
  onPress: CallableFunction,
  backgroundColor?: string,
  textColor?: string,
  fontSize?: number,
  style?: ViewStyle|undefined,
  disabled?: boolean,
}

const RoundedButton: FC<RoundedButtonProps> = function ({
  children,
  onPress,
  backgroundColor = colors.primary.main,
  textColor = colors.secondary.main,
  fontSize = fonts.content.size,
  style = undefined,
  disabled = false,
}: RoundedButtonProps) {
  return (
    <Container
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={{ ...style }}
      disabled={disabled}
    >
      <ButtonText textColor={textColor} fontSize={fontSize}>{children}</ButtonText>
    </Container>
  );
};

export default RoundedButton;
