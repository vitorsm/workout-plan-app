/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageDialog from './components/message-dialog';
import { Message } from './components/message-dialog/message-container';
import Login from './features/login/views/Login';
import { RootGlobalState } from './store/reducers';

const App = function () {
  const { error } = useSelector((state: RootGlobalState) => state.errorsReducer);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [messageData, setMessageData] = useState<Message|null>(null);

  useEffect(() => {
    setShowErrorDialog(!!error);
    setMessageData({ title: error?.title, message: error ? error.descriptions : [] });
  }, [error]);

  const handleErrorDialogOk = () => {
    setShowErrorDialog(false);
  };

  const renderMessageDialog = () => {
    if (!showErrorDialog) {
      return;
    }

    return (
      <MessageDialog
        messageData={messageData}
        onPressOk={handleErrorDialogOk}
      />
    );
  };

  return (
    <>
      {renderMessageDialog()}
      <Login />
    </>
  );
};

export default App;
