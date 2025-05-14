import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Modal } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserService } from '../services/userService';
import '../css/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const user = await UserService.login(values.username, values.password);
      localStorage.setItem('user', JSON.stringify(user));
      message.success('登录成功！');
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const onRegisterFinish = async (values) => {
    try {
      await UserService.register({
        ...values,
        isAdmin: false
      });
      message.success('注册成功！请登录');
      setIsRegisterVisible(false);
      setRegisterError('');
      form.resetFields();
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <div className="login-container">
      <Button
        className="back-to-home"
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
      >
        返回首页
      </Button>
      <Card className="login-card">
        <h2 className="login-title">在线书店登录</h2>
        <Form
          name="login"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large"
              onChange={() => setLoginError('')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="密码" 
              size="large"
              onChange={() => setLoginError('')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
          
          <Form.Item>
            <Button type="link" block onClick={() => setIsRegisterVisible(true)}>
              还没有账号？点击注册
            </Button>
          </Form.Item>
          
          {loginError && (
            <div className="login-error">
              {loginError}
            </div>
          )}
        </Form>
      </Card>

      <Modal
        title="用户注册"
        open={isRegisterVisible}
        onCancel={() => setIsRegisterVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="register"
          onFinish={onRegisterFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码长度不能小于6位' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号！' },
              { pattern: /^1\d{10}$/, message: '请输入有效的手机号！' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="手机号" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: '请输入地址！' }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="地址" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>

          {registerError && (
            <div className="login-error">
              {registerError}
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;
