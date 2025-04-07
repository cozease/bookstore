import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Button, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import data from '../assets/data.json';

const { Title } = Typography;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(data.orders);
  }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case 'delivered':
        return <Tag color="green">已送达</Tag>;
      case 'processing':
        return <Tag color="blue">处理中</Tag>;
      case 'pending':
        return <Tag color="orange">待处理</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const expandedRowRender = (record) => {
    const columns = [
      { title: '书名', dataIndex: 'title', key: 'title' },
      { title: '数量', dataIndex: 'quantity', key: 'quantity' },
      { title: '单价', dataIndex: 'price', key: 'price', render: (text) => `¥${text}` },
      {
        title: '小计',
        key: 'subtotal',
        render: (_, record) => `¥${(parseFloat(record.price) * record.quantity).toFixed(2)}`
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.items}
        pagination={false}
        rowKey="title"
      />
    );
  };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '下单日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>我的订单</Title>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={orders}
        rowKey="id"
      />
    </div>
  );
};

export default OrdersPage;
