import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Typography, message } from 'antd';
import { OrderService } from '../services/orderService';
import noCoverImage from '../assets/nocover.png';

const { Title } = Typography;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await OrderService.getUserOrders(user.id);
        setOrders(data);
      } catch (error) {
        message.error('加载订单失败');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusTag = (status) => {
    const statusMap = {
      'pending': { color: 'gold', text: '待处理' },
      'processing': { color: 'blue', text: '处理中' },
      'shipped': { color: 'cyan', text: '已发货' },
      'completed': { color: 'green', text: '已完成' },
      'cancelled': { color: 'red', text: '已取消' }
    };
    const { color, text } = statusMap[status] || { color: 'default', text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: getStatusTag,
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount) => `￥${(amount / 100).toFixed(2)}`,
    },
    {
      title: '收货地址',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      ellipsis: true,
    },
  ];

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '图书',
        dataIndex: 'book',
        key: 'book',
        render: (book) => (
          <Space>
            <img 
              src={book.coverUrl || noCoverImage} 
              alt={book.title} 
              style={{ width: 50 }}
            />
            <div>
              <div>{book.title}</div>
              <div style={{ color: '#666' }}>{book.author}</div>
            </div>
          </Space>
        ),
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render: (price) => `￥${(price / 100).toFixed(2)}`,
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 80,
      },
      {
        title: '小计',
        key: 'subtotal',
        width: 120,
        render: (_, record) => `￥${((record.price * record.quantity) / 100).toFixed(2)}`,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.orderItems}
        pagination={false}
        rowKey="id"
      />
    );
  };

  return (
    <div className="orders-page">
      <Card>
        <Title level={2}>我的订单</Title>
        <Table
          loading={loading}
          columns={columns}
          dataSource={orders}
          rowKey="id"
          expandable={{
            expandedRowRender,
          }}
          pagination={{
            defaultPageSize: 10,
            showTotal: (total) => `共 ${total} 条订单`,
          }}
        />
      </Card>
    </div>
  );
};

export default OrdersPage;
