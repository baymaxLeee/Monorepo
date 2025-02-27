import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { setToken } from '@/store/reducers/userSlice';
import { login } from '@/api';
import './index.less';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = ({ username, password }) => {
    console.log('Received values of form: ', username, password);
    login({ username, password }).then(({ token }) => {
      dispatch(setToken(token));
      navigate('/home');
    });
  };

  return (
    <div className="login-wrapper">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="/register">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
