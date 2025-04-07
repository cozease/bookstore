import React, { useState, useEffect } from 'react';
import { Typography, Table, InputNumber, Button, Space, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import data from '../assets/data.json';

const { Title } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(data.cartItems);
  }, []);

  const handleQuantityChange = (id, value) => {
    message.success(`已更新商品数量: ${value}`);
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const handleRemove = (id) => {
    message.success(`已从购物车移除商品`);
  };

  const columns = [
    {
      title: '商品',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={record.cover} alt={text} style={{ marginRight: 10, width: 50, height: 50 }} />
          {text}
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: '金额',
      key: 'amount',
      render: (_, record) => `¥${(parseFloat(record.price) * record.quantity).toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  // 计算总金额
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  ).toFixed(2);

  return (
    <div>
      <Title level={2}>购物车</Title>

      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <Space>
          <Title level={4}>总计: ¥{totalAmount}</Title>
          <Button type="primary" size="large">
            结算
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CartPage;

