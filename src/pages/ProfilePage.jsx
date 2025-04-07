import React, { useState, useEffect } from 'react';
import { Typography, Form, Input, Button, Divider, message, Row, Col, Avatar, Upload } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import data from '../assets/data.json';

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(data.userInfo);
  }, []);

  const handleEdit = () => {
    form.setFieldsValue(userInfo);
    setEditing(true);
  };

  const handleSave = (values) => {
    console.log('保存的信息:', values);
    message.success('个人信息已更新');
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div>
      <Title level={2}>个人信息</Title>
      <Row gutter={24}>
        <Col span={6}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Avatar size={120} icon={<UserOutlined />} />
            <div style={{ marginTop: 10 }}>
              <Upload>
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </div>
          </div>
        </Col>
        <Col span={18}>
          {!editing ? (
            <div>
              <div style={{ marginBottom: 16 }}>
                <strong>用户名:</strong> {userInfo.username}
              </div>
              <div style={{ marginBottom: 16 }}>
                <strong>姓名:</strong> {userInfo.name}
              </div>
              <div style={{ marginBottom: 16 }}>
                <strong>邮箱:</strong> {userInfo.email}
              </div>
              <div style={{ marginBottom: 16 }}>
                <strong>手机:</strong> {userInfo.phone}
              </div>
              <div style={{ marginBottom: 16 }}>
                <strong>地址:</strong> {userInfo.address}
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
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input />
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
        </Col>
      </Row>

      <Divider />

      <div>
        <Title level={3}>密码管理</Title>
        <Button type="primary">
          修改密码
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
