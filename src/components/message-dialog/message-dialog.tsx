/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import React, {
  useRef, useEffect, useState, FC,
} from 'react';
import {
  Animated, Easing, Dimensions, StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { JSX } from '@babel/types';
import { Container, Paper } from './style';
import MessageContainer, { Message } from './message-container';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 5,
  },
  blurView: {
    position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 10,
  },
});

interface MessageDialogProps {
  messageData: Message|null,
  elementIcon?: JSX.Element|undefined,
  contentElement?: JSX.Element|undefined,
  onPressOk?: CallableFunction|undefined,
  onPressCancel?: CallableFunction|undefined,
  okText?: string|undefined,
  cancelText?: string|undefined,
  show?: boolean,
  onClose?: CallableFunction|undefined,
}

const MessageDialog: FC<MessageDialogProps> = function ({
  messageData,
  elementIcon = undefined,
  contentElement = undefined,
  onPressOk = undefined,
  onPressCancel = undefined,
  okText = 'OK',
  cancelText = 'Cancel',
  show = true,
  onClose = undefined,
}: MessageDialogProps) {
  const [showScreen, setShowScreen] = useState(false);

  const paperMarginLeft = 30;
  const paperMarginTop = 50;
  const paperWidth = Dimensions.get('window').width - 2 * paperMarginLeft;

  const darkenAnimateValue = useRef(new Animated.Value(0)).current;
  const positionAnimateValue = useRef(new Animated.Value(0)).current;
  const opacityValue = darkenAnimateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const positionValue = positionAnimateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, paperMarginTop],
  });

  const startAnimation = (startValue: number, endValue: number) => {
    darkenAnimateValue.setValue(startValue);
    positionAnimateValue.setValue(startValue);

    Animated.timing(darkenAnimateValue, {
      toValue: endValue,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    Animated.timing(positionAnimateValue, {
      toValue: endValue,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.elastic(1.2),
    }).start(() => {
      if (endValue < startValue) {
        setShowScreen(false);
      }
    });
  };

  const startAnimationUp = () => {
    startAnimation(0, 1);
  };

  const startAnimationDown = () => {
    startAnimation(1, 0);
  };

  useEffect(() => {
    if (messageData) {
      setShowScreen(show);
      startAnimationUp();
    }
  }, [messageData, show]);

  const onPressOkInternal = () => {
    startAnimationDown();
    if (onPressOk) {
      onPressOk();
    }
    if (onClose) {
      onClose();
    }
  };

  const onPressCancelInternal = () => {
    startAnimationDown();
    if (onPressCancel) {
      onPressCancel();
    }
    if (onClose) {
      onClose();
    }
  };

  if (!showScreen) {
    return null;
  }

  return (
    <Container>
      <Animated.View style={{ ...styles.container, opacity: opacityValue }}>
        <BlurView
          style={styles.blurView}
          reducedTransparencyFallbackColor="gray"
          blurType="light"
          blurAmount={3}
        />
      </Animated.View>

      <Animated.View style={{ ...styles.content, top: positionValue }}>
        <Paper top={paperMarginTop} left={paperMarginLeft} width={paperWidth}>
          <MessageContainer
            messageData={messageData}
            onPressOk={onPressOkInternal}
            elementIcon={elementIcon}
            contentElement={contentElement}
            onPressCancel={onPressCancelInternal}
            showCancel={!!onPressCancel}
            okText={okText}
            cancelText={cancelText}
          />
        </Paper>
      </Animated.View>
    </Container>
  );
};

export default MessageDialog;
