/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import { JSX } from '@babel/types';
import {
  MessageContentContainer, MessageTitle, TitleContainer, ImageContainer,
  TextContainer, MessageText, ActionsContainer,
} from './style';
import colors from '../../configs/colors';
import RoundedButton from '../rounded-button';

export interface Message {
  title?: string;
  message: string[];
}

interface MessageContainerProps {
  messageData: Message|null,
  onPressOk: CallableFunction,
  elementIcon?: JSX.Element|undefined,
  contentElement?: JSX.Element|undefined,
  onPressCancel?: CallableFunction|undefined,
  okText?: string|undefined,
  cancelText?: string|undefined,
}

const MessageContainer: FC<MessageContainerProps> = function ({
  messageData,
  onPressOk,
  elementIcon = undefined,
  contentElement = undefined,
  onPressCancel = undefined,
  okText = undefined,
  cancelText = undefined,
}: MessageContainerProps) {
  const renderIcon = () => {
    if (elementIcon) {
      return (<ImageContainer>{elementIcon}</ImageContainer>);
    }
    return null;
  };

  const renderCancelButton = () => {
    if (!onPressCancel) {
      return null;
    }

    return (
      <RoundedButton
        onPress={onPressCancel}
        style={{ flexGrow: 1, marginRight: 10 }}
        backgroundColor="white"
        textColor={colors.primary.main}
      >
        {cancelText}
      </RoundedButton>
    );
  };

  const renderMessages = (messages: string[]) => messages.map((message, index) => (
    <TextContainer key={`MessageDialogTextContainer${index}`}><MessageText>{message}</MessageText></TextContainer>
  ));

  const renderContent = () => {
    if (contentElement) {
      return contentElement;
    }

    return (
      <>
        {renderIcon()}
        {renderMessages(messageData?.message ? messageData.message : [''])}
        <ActionsContainer>
          {renderCancelButton()}
          <RoundedButton
            onPress={onPressOk}
            style={{ flexGrow: 1, marginLeft: 10 }}
          >
            {okText}

          </RoundedButton>
        </ActionsContainer>

      </>
    );
  };

  return (
    <MessageContentContainer>
      <TitleContainer><MessageTitle>{messageData.title}</MessageTitle></TitleContainer>
      {renderContent()}
    </MessageContentContainer>
  );
};

export default MessageContainer;
