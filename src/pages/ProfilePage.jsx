import React, { useState, useEffect } from 'react';
import { Typography, Form, Input, Button, Divider, message, Modal } from 'antd';
import { SaveOutlined, LockOutlined } from '@ant-design/icons';
import { UserService } from '../services/userService';

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const [passwordError, setPasswordError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await UserService.getUserInfo(user.id);
        setUserInfo(data);
      } catch (error) {
        message.error('获取用户信息失败');
      }
    };
    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    form.setFieldsValue(userInfo);
    setEditing(true);
  };

  const handleSave = async (values) => {
    try {
      await UserService.updateUser(user.id, values);
      const updatedUser = await UserService.getUserInfo(user.id);
      setUserInfo(updatedUser);
      // 更新本地存储中的用户信息
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...updatedUser
      }));
      message.success('个人信息已更新');
      setEditing(false);
    } catch (error) {
      message.error('更新失败：' + error.message);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(userInfo);
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>个人信息</Title>
      {!editing ? (
        <div>
          <div style={{ marginBottom: 16 }}>
            <strong>用户名：</strong> {userInfo.username}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>邮箱：</strong> {userInfo.email}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>手机：</strong> {userInfo.phone}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>地址：</strong> {userInfo.address}
          </div>
          <Button type="primary" onClick={handleEdit}>
            编辑资料
          </Button>
        </div>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSave}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input disabled />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="手机"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1\d{10}$/, message: '请输入有效的手机号码' }
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ marginRight: 8 }}>
              保存
            </Button>
            <Button onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      )}

      <Divider />

      <div>
        <Title level={3}>密码管理</Title>
        <Button type="primary" onClick={() => setIsPasswordModalVisible(true)}>
          修改密码
        </Button>
      </div>

      <Modal
        title="修改密码"
        open={isPasswordModalVisible}
        onCancel={() => {
          setIsPasswordModalVisible(false);
          passwordForm.resetFields();
          setPasswordError('');
        }}
        footer={null}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await UserService.changePassword(user.id, values.oldPassword, values.newPassword);
              message.success('密码修改成功');
              setIsPasswordModalVisible(false);
              passwordForm.resetFields();
              setPasswordError('');
            } catch (error) {
              setPasswordError(error.message || '密码修改失败');
            }
          }}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请输入当前密码"
              onChange={() => setPasswordError('')}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度不能小于6位' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请再次输入新密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
