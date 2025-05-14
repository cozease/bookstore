import React, { useState, useEffect } from 'react';
import { Table, Button, Switch, message } from 'antd';
import { UserService } from '../services/userService';

const UserManagePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 加载用户数据
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      message.error('加载用户失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 处理权限变更
  const handleRoleChange = async (userId, isAdmin) => {
    try {
      await UserService.updateUserRole(userId, isAdmin);
      message.success('修改成功');
      loadUsers();
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '是否管理员',
      key: 'isAdmin',
      render: (_, record) => (
        <Switch
          checked={record.isAdmin}
          onChange={(checked) => handleRoleChange(record.id, checked)}
          disabled={record.username === JSON.parse(localStorage.getItem('user')).username}
        />
      ),
    },
  ];

  return (
    <div className="user-manage-page">
      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        rowKey="id"
      />
    </div>
  );
};

export default UserManagePage;
