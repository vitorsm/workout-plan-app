import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations } from '../../../store/reducers/user';
import { RootGlobalState } from '../../../store/reducers';
import {
  Label, TextInput, Container, Form, FormItem,
} from './style';
import colors from '../../../configs/colors';
import PlainButton from '../../../components/plain-button';

const Login = function () {
  const dispatch = useDispatch();
  const authenticate = async (
    login: string,
    password: string,
  ) => dispatch(userOperations.authenticate(login, password));

  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(null);

  const [loginBorder, setLoginBorder] = useState({ borderSize: null, borderColor: null });
  const [passwordBorder, setPasswordBorder] = useState({ borderSize: null, borderColor: null });

  const selectedBorderSize = 2;
  const selectedBorderColor = colors.primary.main;

  const onLoginButtonPress = async () => {
    authenticate(login, password);
  };

  const onFocus = (setValueFunc: CallableFunction) => {
    setValueFunc({ borderSize: selectedBorderSize, borderColor: selectedBorderColor });
  };

  const onBlur = (setValueFunc: CallableFunction) => {
    setTimeout(() => setValueFunc({ borderSize: null, borderColor: null }), 100);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Container>
      <Form>
        <FormItem>
          <Label>Login</Label>
          <TextInput
            borderSize={loginBorder.borderSize}
            borderColor={loginBorder.borderColor}
            onFocus={() => onFocus(setLoginBorder)}
            onBlur={() => onBlur(setLoginBorder)}
            onChangeText={setLogin}
          />
        </FormItem>

        <FormItem>
          <Label>Password</Label>
          <TextInput
            secureTextEntry
            borderSize={passwordBorder.borderSize}
            borderColor={passwordBorder.borderColor}
            onFocus={() => onFocus(setPasswordBorder)}
            onBlur={() => onBlur(setPasswordBorder)}
            onChangeText={setPassword}
          />
        </FormItem>
      </Form>
      <PlainButton onPress={onLoginButtonPress}>Enter</PlainButton>
    </Container>
  );
};

export default Login;
